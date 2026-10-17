export type Urgency = "Rutine" | "Prioritar" | "Urgjent";

export interface Referral {
  title: string;
  fromInstitution: string;
  fromDepartment: string;
  toInstitution: string;
  toService: string;
  urgency: Urgency;
  issueDate: string; // YYYY-MM-DD
  patientName: string;
  patientDob: string;
  patientAge: string;
  patientId: string;
  patientSex: "" | "M" | "F";
  patientContact: string;
  insuranceId: string;
  reason: string;
  history: string;
  allergies: string;
  exam: string;
  vitals: string;
  diagnostics: string;
  therapy: string;
  diagnosis: string;
  icd: string;
  question: string;
  physicianName: string;
  physicianSpec: string;
  physicianLicense: string;
}

export const DEFAULT_TITLE = "UDHËZIM PËR KONSULTIM";

export function todayISO(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export function emptyReferral(issueDate = ""): Referral {
  return {
    title: DEFAULT_TITLE,
    fromInstitution: "", fromDepartment: "", toInstitution: "", toService: "",
    urgency: "Rutine", issueDate,
    patientName: "", patientDob: "", patientAge: "", patientId: "", patientSex: "",
    patientContact: "", insuranceId: "",
    reason: "", history: "", allergies: "", exam: "", vitals: "", diagnostics: "",
    therapy: "", diagnosis: "", icd: "", question: "",
    physicianName: "", physicianSpec: "", physicianLicense: "",
  };
}

/** Normalizes whitespace only: trims lines, collapses spaces, max one blank line. Never changes content meaning. */
export function cleanText(s: string): string {
  return s
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface CheckItem { key: string; label: string; done: boolean }

export function checkEssentials(r: Referral): CheckItem[] {
  const f = (v: string) => v.trim().length > 0;
  return [
    { key: "fromInstitution", label: "Institucioni udhëzues", done: f(r.fromInstitution) },
    { key: "toService", label: "Specialiteti / shërbimi i adresuar", done: f(r.toService) },
    { key: "issueDate", label: "Data e lëshimit", done: f(r.issueDate) },
    { key: "patientName", label: "Emri dhe mbiemri i pacientit", done: f(r.patientName) },
    { key: "patientDob", label: "Datëlindja ose mosha", done: f(r.patientDob) || f(r.patientAge) },
    { key: "reason", label: "Arsyeja e udhëzimit", done: f(r.reason) },
    { key: "history", label: "Anamneza", done: f(r.history) },
    { key: "allergies", label: "Alergjitë (ose “Nuk ka të njohura”)", done: f(r.allergies) },
    { key: "diagnosis", label: "Diagnoza e punës", done: f(r.diagnosis) },
    { key: "question", label: "Pyetja për konsulentin", done: f(r.question) },
    { key: "physicianName", label: "Mjeku udhëzues", done: f(r.physicianName) },
  ];
}

export const CLINICAL_FIELDS = [
  ["reason", "Arsyeja e udhëzimit"],
  ["history", "Anamneza"],
  ["allergies", "Alergjitë"],
  ["exam", "Ekzaminimi objektiv"],
  ["vitals", "Shenjat vitale"],
  ["diagnostics", "Ekzaminimet diagnostike"],
  ["therapy", "Trajtimi aktual"],
] as const;

export function sexLabel(s: Referral["patientSex"]) {
  return s === "M" ? "Mashkull" : s === "F" ? "Femër" : "";
}

export function toPlainText(r: Referral): string {
  const out: string[] = [];
  const line = (k: string, v: string) => v.trim() && out.push(`${k}: ${v.trim()}`);
  out.push((r.title || DEFAULT_TITLE).toUpperCase(), `Urgjenca: ${r.urgency}`);
  line("Data", formatDate(r.issueDate));
  out.push("");
  line("Nga institucioni", r.fromInstitution);
  line("Reparti", r.fromDepartment);
  line("Drejtuar institucionit", r.toInstitution);
  line("Specialiteti / shërbimi", r.toService);
  out.push("", "PACIENTI");
  line("Emri dhe mbiemri", r.patientName);
  line("Datëlindja", formatDate(r.patientDob));
  line("Mosha", r.patientAge);
  line("Gjinia", sexLabel(r.patientSex));
  line("Nr. personal", r.patientId);
  line("Kontakti", r.patientContact);
  line("Nr. i sigurimit", r.insuranceId);
  for (const [k, label] of CLINICAL_FIELDS) {
    const v = r[k].trim();
    if (v) out.push("", label.toUpperCase(), v);
  }
  if (r.diagnosis.trim() || r.icd.trim()) {
    out.push("", "DIAGNOZA E PUNËS", [r.diagnosis.trim(), r.icd.trim() && `(ICD-10: ${r.icd.trim()})`].filter(Boolean).join(" "));
  }
  if (r.question.trim()) out.push("", "PYETJA PËR KONSULENTIN", r.question.trim());
  out.push("", "MJEKU UDHËZUES");
  line("Emri", r.physicianName);
  line("Specializimi", r.physicianSpec);
  line("Nr. i licencës", r.physicianLicense);
  out.push("", "Dokument klinik – model i përgatitur në DRX.");
  return out.join("\n");
}

export interface Template { id: string; label: string; service: string; fields: Partial<Record<keyof Referral, string>> }

/** Templates contain only prompts/labels — never findings or diagnoses. */
export const TEMPLATES: Template[] = [
  { id: "kardio", label: "Kardiologji", service: "Kardiologji", fields: {
    history: "Simptomat kryesore dhe kohëzgjatja: \nFaktorët e rrezikut kardiovaskular: \nNgjarje të mëparshme kardiake: ",
    diagnostics: "EKG (data, përshkrimi): \nAnalizat laboratorike relevante: ",
    question: "Kërkohet vlerësim kardiologjik për: " } },
  { id: "neuro", label: "Neurologji", service: "Neurologji", fields: {
    history: "Fillimi dhe ecuria e simptomave neurologjike: \nEpisode të ngjashme më parë: ",
    exam: "Statusi neurologjik i orientuar: ",
    question: "Kërkohet vlerësim neurologjik për: " } },
  { id: "kirurgji", label: "Kirurgji", service: "Kirurgji e përgjithshme", fields: {
    history: "Ankesat kryesore dhe kohëzgjatja: \nOperacione të mëparshme: ",
    exam: "Gjetjet lokale: ",
    question: "Kërkohet vlerësim kirurgjikal për: " } },
  { id: "pediatri", label: "Pediatri", service: "Pediatri", fields: {
    history: "Ankesat dhe kohëzgjatja: \nZhvillimi dhe vaksinimi (sipas kartelës): \nPesha / gjatësia: ",
    question: "Kërkohet vlerësim pediatrik për: " } },
  { id: "orl", label: "ORL", service: "Otorinolaringologji (ORL)", fields: {
    history: "Ankesat ORL dhe kohëzgjatja: \nEpisode të përsëritura: ",
    exam: "Gjetjet në ekzaminimin ORL: ",
    question: "Kërkohet vlerësim ORL për: " } },
];

export function applyTemplate(r: Referral, t: Template): Referral {
  const next = { ...r };
  if (!next.toService.trim()) next.toService = t.service;
  for (const [k, v] of Object.entries(t.fields) as [keyof Referral, string][]) {
    const cur = String(next[k] ?? "").trim();
    (next as Record<string, string>)[k] = cur ? `${cur}\n${v}` : v;
  }
  return next;
}