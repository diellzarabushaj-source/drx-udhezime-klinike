import type { Referral, Template } from "./referral";
import { cleanText } from "./referral";
import { findTemplateSlots, replaceTemplateSlot } from "./ready-template";

/** Every suggested statement comes from the clinician's typed input or the
 * selected template's generic consultation REQUEST. No medical facts are inferred. */
const ALLOWED = [
  "reason", "history", "allergies", "exam", "vitals", "diagnostics",
  "therapy", "diagnosis", "icd", "question", "patientAge", "toService"
] as const;
export type DraftField = typeof ALLOWED[number];
export interface DraftChange {
  field: DraftField;
  label: string;
  current: string;
  proposed: string;
  source: "Shënimi i mjekut" | "Kërkesa e shabllonit";
}
export interface QuickDraft { changes: DraftChange[]; skipped: DraftField[]; next: Referral }

const NAMES: Record<DraftField, string> = {
  reason: "Arsyeja e udhëzimit", history: "Anamneza", allergies: "Alergjitë",
  exam: "Ekzaminimi objektiv", vitals: "Shenjat vitale",
  diagnostics: "Ekzaminimet diagnostike", therapy: "Trajtimi",
  diagnosis: "Diagnoza e punës", icd: "ICD-10",
  question: "Pyetja për konsulentin", patientAge: "Mosha",
  toService: "Specialiteti",
};
const ascii = (value: string) =>
  value.toLocaleLowerCase("sq").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function normalizeSearch(value: string): string {
  return ascii(value).replace(/[^a-z0-9]+/g, " ").trim();
}

const vitalRe = /^(?:ta|bp)\s*[:=]?\s*\d{2,3}\s*\/\s*\d{2,3}\b|^(?:puls(?:i)?|hr|fc|spo2?|saturimi|temp(?:eratura)?|t°|fr|rr|pesha)\s*[:=]?\s*\d/i;
const diagnosticsRe = /^(?:ekg|ecg|rtg|rx|usg|eko|ct|skaner|mri|rezult(?:ati)?|analiz(?:a|at)|hemogram|crp|troponin)\b/i;
const labels: { re: RegExp; field: DraftField; prefix?: string }[] = [
  { re: /^(?:arsye(?:ja)?|ankes(?:a|at)|simptom(?:a|at))$/, field: "reason" },
  { re: /^(?:anamnez(?:a)?|histori(?:a)?)$/, field: "history" },
  { re: /^(?:fillimi|kohezgjatja|ecuria)$/, field: "history" },
  { re: /^(?:alergji(?:te)?)$/, field: "allergies" },
  { re: /^(?:ekzaminimi|statusi|gjetjet)$/, field: "exam" },
  { re: /^(?:ta|bp|puls(?:i)?|hr|fc|spo2?|saturimi|temp(?:eratura)?|fr|rr|pesha)$/, field: "vitals" },
  { re: /^(?:ekg|ecg|analiz(?:a|at)|hemogram(?:a)?|crp|troponin(?:a)?|ekografi|ultraze|usg|rtg|rx|ct|mri|imazheri(?:a)?|diagnoza radiologjike)$/, field: "diagnostics" },
  { re: /^(?:trajtim(?:i)?|terapi(?:a)?|barnat|medikament(?:et)?|terapia aktuale)$/, field: "therapy" },
  { re: /^(?:diagnoz(?:a|e)?|diagnoza e punes)$/, field: "diagnosis" },
  { re: /^(?:icd|icd10|icd 10)$/, field: "icd" },
  { re: /^(?:pyetja|kerkesa|konsulta)$/, field: "question" },
  { re: /^(?:mosha|moshe)$/, field: "patientAge" },
];
const MAX_LENGTH = 4000;
function segments(input: string): string[] {
  return input.replace(/\r\n?/g, "\n").split(/[\n;,]+/).map((s) => cleanText(s)).filter(Boolean);
}

/** Create a draft but never replace an existing field.
 * The caller must display the changes and require explicit user approval.
 */
export function proposeQuickDraft(current: Referral, selected: Template, userInput: string): QuickDraft {
  const raw = cleanText(userInput).slice(0, MAX_LENGTH);
  const buckets = new Map<DraftField, string[]>();
  const add = (key: DraftField, val: string) => {
    const cleaned = cleanText(val);
    if (cleaned) buckets.set(key, [...(buckets.get(key) ?? []), cleaned]);
  };
  const loose: string[] = [];
  for (const part of segments(raw)) {
    const labelled = /^([\p{L}\d .\/\-°]{1,35})\s*:\s*(.+)$/u.exec(part);
    if (labelled) {
      const label = ascii(labelled[1]!.trim()).replace(/\s+/g, " ");
      const match = labels.find((x) => x.re.test(label));
      if (match) {
        // Preserve the clinician's own label for clinical measurements and test results.
        const payload = labelled[2]!.trim();
        add(match.field, match.field === "vitals" || match.field === "diagnostics" || ["fillimi","kohezgjatja","ecuria"].includes(label) ? labelled[1]!.trim() + ": " + payload : payload);
        continue;
      }
    }
    const n = ascii(part);
    if (vitalRe.test(n)) add("vitals", part);
    else if (diagnosticsRe.test(n)) add("diagnostics", part);
    else loose.push(part);
  }
  if (loose.length) {
    const complaint = loose.join("; ");
    add("reason", complaint);
    add("history", "Ankesa e raportuar: " + complaint);
  }
  // Use only the entered complaint; never invent patient exam or test results.
  const reason = buckets.get("reason")?.join("; ");
  if (reason) buckets.set("reason", ["Kërkohet konsultë specialistike për: " + reason]);
  if (selected.service && raw) add("toService", selected.service);
  if (selected.request && raw && !buckets.has("question")) {
    add("question", selected.request);
  } else if (!buckets.has("question") && raw && selected.service) {
    add("question", "Kërkohet vlerësim nga " + selected.service + " dhe rekomandim për hapat e mëtejshëm.");
  }

  const next = { ...current };
  const changes: DraftChange[] = [], skipped: DraftField[] = [];
  const typedSources = new Set<DraftField>();
  for (const [key] of buckets) typedSources.add(key);
  for (const key of ALLOWED) {
    const val = buckets.get(key)?.join("\n").trim() ?? "";
    if (!val) continue;
    const original = String(current[key]);
    let proposal = val;
    if (original.trim()) {
      // A prepared paragraph is not a completed clinical finding.
      // Keep its wording, and fill exactly ONE patient-data placeholder
      // only from information the clinician explicitly typed.
      if (!typedSources.has(key) || !["reason","history","allergies","exam","vitals","diagnostics","therapy"].includes(key)) {
        skipped.push(key); continue;
      }
      const slots = findTemplateSlots(next).filter((slot) =>
        slot.field === key && slot.marker.toLowerCase().startsWith("[plotëso:")
      );
      const preferred = slots.find((slot) =>
        key === "history" ? /ankesat e raportuara/i.test(slot.prompt) :
        key === "reason" ? /ankesa kryesore/i.test(slot.prompt) :
        key === "vitals" ? /ta|puls|spO/i.test(slot.prompt) :
        key === "diagnostics" ? /analizat|ekzaminimet/i.test(slot.prompt) :
        true
      ) ?? slots[0];
      if (!preferred) { skipped.push(key); continue; }
      const factualValue = key === "history" ? val.replace(/^Ankesa e raportuar:\s*/i, "") : val;
      const merged = replaceTemplateSlot(next, preferred, factualValue);
      if (merged === next) { skipped.push(key); continue; }
      proposal = String(merged[key]);
    }
    next[key] = proposal as never;
    changes.push({
      field: key, label: NAMES[key], current: original,
      proposed: proposal,
      source: typedSources.has(key) ? "Shënimi i mjekut" : "Kërkesa e shabllonit",
    });
  }
  return { changes, skipped, next };
}
