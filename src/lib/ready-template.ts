import { cleanText, type Referral, type Template } from "./referral";

/**
 * A prepared referral is an editable DRAFT. No diagnosis, measurement,
 * examination, treatment or allergy is asserted. Patient-dependent facts
 * stay in explicit [plotëso: ...] or [konfirmo: ...] markers.
 */
export const TEMPLATE_MARKER = /\[(?:plotëso|konfirmo):[^\]\n]+\]/gi;
export const PREPARED_FIELD_LABELS = {
  reason: "Arsyeja e konsultës",
  history: "Anamneza",
  allergies: "Alergjitë",
  exam: "Ekzaminimi objektiv",
  vitals: "Shenjat vitale",
  diagnostics: "Ekzaminimet",
  therapy: "Trajtimi aktual",
  question: "Pyetja për specialistin",
  toService: "Shërbimi pritës",
} as const;
export type PreparedField = keyof typeof PREPARED_FIELD_LABELS;

const CLINICAL_FIELDS: PreparedField[] = [
  "reason", "history", "allergies", "exam", "vitals",
  "diagnostics", "therapy", "question", "toService",
];

export interface PreparedChange {
  field: PreparedField;
  label: string;
  proposed: string;
}
export interface PreparedProposal {
  changes: PreparedChange[];
  preserved: PreparedField[];
  next: Referral;
  pending: number;
}
export interface TemplateSlot {
  id: string;
  field: PreparedField;
  label: string;
  marker: string;
  prompt: string;
}

function guideText(value: string | undefined, fallback: string): string {
  const text = cleanText(value ?? "")
    .replace(/^(?:Pyetni\s*\/\s*dokumentoni|Pyesni|Pyetni|Dokumentoni|Nëse janë ekzaminuar|Sipas matjeve|Sipas ekzaminimeve të kryera|Shënoni|Përshkruani)\s*:?\s*/i, "")
    .replace(/^[\s:–.-]+|[\s:–.-]+$/g, "");
  return text || fallback;
}

export function isTemplateIncomplete(value: string): boolean {
  TEMPLATE_MARKER.lastIndex = 0;
  return TEMPLATE_MARKER.test(value);
}

export function findTemplateSlots(r: Referral): TemplateSlot[] {
  const slots: TemplateSlot[] = [];
  for (const field of CLINICAL_FIELDS) {
    const value = String(r[field] ?? "");
    TEMPLATE_MARKER.lastIndex = 0;
    for (const match of value.matchAll(TEMPLATE_MARKER)) {
      if (!match[0]) continue;
      slots.push({
        id: field + ":" + match.index,
        field,
        label: PREPARED_FIELD_LABELS[field],
        marker: match[0],
        prompt: match[0].slice(1, -1).replace(/^(?:plotëso|konfirmo):\s*/i, ""),
      });
    }
  }
  return slots;
}

/** Propose non-destructive changes; UI requires explicit acceptance. */
export function prepareCompleteTemplate(r: Referral, template: Template): PreparedProposal {
  if (template.id === "bosh") return { changes: [], preserved: [], next: { ...r }, pending: findTemplateSlots(r).length };

  const title = template.label.toLocaleLowerCase("sq");
  const service = template.service || "[plotëso: shërbimi përkatës]";
  const historyFocus = guideText(template.fields.history, "ecurinë dhe simptomat relevante sipas anamnezës");
  const examFocus = guideText(template.fields.exam, "gjetjet objektive relevante sipas ekzaminimit të kryer");
  const diagnosticFocus = guideText(template.fields.diagnostics, "analizat, imazherinë dhe rezultatet e kryera");
  const goal = guideText(template.request, "vlerësim specialistik dhe rekomandim për hapat e mëtejshëm");

  const content: Record<PreparedField, string> = {
    toService: service,
    reason: "Kërkohet konsultë në shërbimin " + service + " për vlerësimin e [konfirmo: " + title + "]. Indikacioni konkret: [plotëso: ankesa kryesore dhe arsyeja e referimit].",
    history: [
      "Pacienti paraqitet për [plotëso: përshkruaj ankesat e raportuara].",
      "Fillimi i simptomave: [plotëso: data ose kohëzgjatja]. Ecuria: [plotëso: përkeqësimi, përmirësimi apo përsëritja sipas anamnezës].",
      "Të dhëna specifike: [plotëso: " + historyFocus + "].",
      "Sëmundjet shoqëruese dhe historiku relevant: [plotëso: anamneza e konfirmuar].",
    ].join("\n"),
    allergies: "Statusi i alergjive: [plotëso: alergjitë e njohura, mungesa e konfirmuar e tyre ose statusi i panjohur].",
    exam: "Në ekzaminimin objektiv, nëse është kryer, dokumentohen: [plotëso: " + examFocus + "].",
    vitals: "Parametrat vitalë të matur: [plotëso: TA, puls, frekuenca respiratore, temperatura, SpO₂ me njësi dhe kohën e matjes; vetëm vlerat e dokumentuara].",
    diagnostics: "Ekzaminimet e kryera dhe rezultatet përkatëse: [plotëso: " + diagnosticFocus + "; shëno datën, njësitë dhe gjetjet vetëm nëse ekzistojnë].",
    therapy: "Trajtimi aktual i konfirmuar: [plotëso: emri i barit, doza, forma, rruga, frekuenca dhe kohëzgjatja ose shëno se informacioni nuk disponohet].",
    question: "Kërkohet " + goal.charAt(0).toLocaleLowerCase("sq") + goal.slice(1).replace(/[.?!]+$/, "") + ", sipas vlerësimit specialistik.",
  };

  const next = { ...r };
  const changes: PreparedChange[] = [];
  const preserved: PreparedField[] = [];
  for (const field of CLINICAL_FIELDS) {
    const proposal = content[field];
    if (String(r[field] ?? "").trim()) {
      preserved.push(field);
      continue;
    }
    next[field] = proposal;
    changes.push({ field, label: PREPARED_FIELD_LABELS[field], proposed: proposal });
  }
  return { changes, preserved, next, pending: findTemplateSlots(next).length };
}

export function replaceTemplateSlot(r: Referral, slot: TemplateSlot, userValue: string): Referral {
  const value = cleanText(userValue);
  if (!value || value.includes("[plotëso:") || value.includes("[konfirmo:")) return r;
  const current = String(r[slot.field]);
  if (!current.includes(slot.marker)) return r;
  return { ...r, [slot.field]: current.replace(slot.marker, value) };
}
