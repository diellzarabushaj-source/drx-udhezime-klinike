import { ADDITIONAL_TEMPLATES } from "./template-library";

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
  parentName: string;
  municipality: string;
  patientAddress: string;
  profession: string;
  insuranceCompany: string;
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
  icd9: string;
  drugCode: string;
  icpc: string;
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
    patientContact: "", parentName: "", municipality: "", patientAddress: "", profession: "", insuranceCompany: "", insuranceId: "",
    reason: "", history: "", allergies: "", exam: "", vitals: "", diagnostics: "",
    therapy: "", diagnosis: "", icd: "", icd9: "", drugCode: "", icpc: "", question: "",
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
  line("Emri i prindit", r.parentName);
  line("Adresa", r.patientAddress);
  line("Komuna", r.municipality);
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
  line("Kodi ICD-9", r.icd9);
  line("Kodi i barnave", r.drugCode);
  line("ICPC", r.icpc);
  line("Nr. i licencës", r.physicianLicense);
  out.push("", "Dokument klinik – model i përgatitur në DRX.");
  return out.join("\n");
}


export interface Template {
  id: string;
  label: string;
  service: string;
  /** Navigation only, never printed as patient facts. */
  category?: string;
  keywords?: string[];
  /** Standard generic consultation request; it requires clinician approval. */
  request?: string;
  fields: Partial<Record<keyof Referral, string>>;
}

const BASE_TEMPLATE_CATEGORIES: Record<string, string> = {
  bosh: "Të përgjithshme", kardio: "Kardiologji", neuro: "Neurologji",
  kirurgji: "Kirurgji dhe traumatologji", pediatri: "Pediatri",
  orl: "Otorinolaringologji", gjinekologji: "Gjinekologji",
  ortopedi: "Kirurgji dhe traumatologji", radiologji: "Mjekësi familjare dhe të tjera",
  interne: "Mjekësi familjare dhe të tjera", dermatologji: "Dermatologji",
  urologji: "Urologji dhe nefrologji", urgjence: "Urgjencë",
  oftalmologji: "Oftalmologji", psikiatri: "Psikiatri dhe psikologji"
};
export function templateCategory(t: Template): string {
  return t.category ?? BASE_TEMPLATE_CATEGORIES[t.id] ?? "Të përgjithshme";
}

/** Shabllonet janë udhëzues për mjekun, jo fakte për pacientin. */
export const TEMPLATES: Template[] = [
  { id:"bosh", label:"Bosh", service:"", fields:{} },
  { id:"kardio", label:"Kardiologji", service:"Kardiologji", fields:{
    history:"Pyesni për fillimin, kohëzgjatjen, faktorët precipitantë dhe sëmundjet kardiovaskulare.",
    vitals:"Sipas matjeve: TA, frekuenca kardiake, SpO₂.",
    diagnostics:"EKG dhe analiza relevante, vetëm nëse janë kryer.",
    question:"Cila është pyetja e saktë klinike për kardiologun?" }},
  { id:"neuro", label:"Neurologji", service:"Neurologji", fields:{
    history:"Kohëfillimi, progresioni, deficitet fokale dhe episodet e mëparshme.",
    exam:"Status neurologjik i orientuar, nëse është kryer.",
    question:"Çfarë vlerësimi neurologjik kërkohet?" }},
  { id:"kirurgji", label:"Kirurgji", service:"Kirurgji e përgjithshme", fields:{
    history:"Ankesa, kohëzgjatja, ndërhyrjet e mëparshme, shenjat shoqëruese.",
    exam:"Gjetjet lokale të ekzaminimit, nëse janë vlerësuar.",
    question:"Cila është arsyeja e konsultimit kirurgjikal?" }},
  { id:"pediatri", label:"Pediatri", service:"Pediatri", fields:{
    history:"Mosha, kohëzgjatja e simptomave, hidrimi, ushqyerja, vaksinimi sipas kartelës.",
    vitals:"Temperatura, pesha dhe parametrat jetësorë sipas matjes.",
    therapy:"Barna të përdorura me dozë dhe kohën e administrimit, vetëm nëse janë konfirmuar." }},
  { id:"orl", label:"ORL", service:"Otorinolaringologji", fields:{
    history:"Fillimi dhe përsëritja e simptomave të hundës, veshit ose fytit.",
    exam:"Otoskopia, orofaringu, hunda, sipas ekzaminimit të kryer.",
    question:"Kërkesa specifike për ORL." }},
  { id:"gjinekologji", label:"Gjinekologji", service:"Gjinekologji", fields:{
    history:"Ankesat, cikli menstrual, shtatzënia e mundshme sipas anamnezës, historiku obstetrik kur është relevant.",
    exam:"Gjetjet e dokumentuara dhe kontrollet e kryera.",
    question:"Pyetja për gjinekologun." }},
  { id:"ortopedi", label:"Ortopedi", service:"Ortopedi / Traumatologji", fields:{
    history:"Mekanizmi i dëmtimit, kohëzgjatja, kufizimi funksional.",
    exam:"Vendndodhja e dhimbjes, ROM, statusi neurovaskular nëse është ekzaminuar.",
    diagnostics:"Radiografia ose imazheria tjetër me datë, nëse është kryer." }},
  { id:"radiologji", label:"Radiologji", service:"Radiologji / Imazheri", fields:{
    reason:"Cilin ekzaminim kërkoni dhe për çfarë pyetje klinike?",
    history:"Indikacioni, simptomat, faktorët e rrezikut relevant.",
    diagnostics:"Imazheria paraprake, nëse ekziston." }},
  { id:"interne", label:"Mjekësi interne", service:"Mjekësi interne", fields:{
    history:"Sëmundjet kronike, simptomat kryesore dhe historiku relevant.",
    therapy:"Barnat kronike dhe ndryshimet e fundit të trajtimit.",
    diagnostics:"Analizat e disponueshme me njësi dhe datë." }},
  { id:"dermatologji", label:"Dermatologji", service:"Dermatologji", fields:{
    history:"Fillimi, lokalizimi, progresioni, kruajtja/dhimbja, ekspozimet relevante.",
    exam:"Morfologjia dhe përhapja e lezioneve, vetëm nga ekzaminimi.",
    therapy:"Trajtimet topike/sistemike të provuara, nëse dihen." }},
  { id:"urologji", label:"Urologji", service:"Urologji", fields:{
    history:"Simptomat urinare, kohëzgjatja, infeksionet e kaluara, dhimbja.",
    diagnostics:"Urinaliza, urinokultura, imazheria, sipas ekzaminimeve të kryera.",
    question:"Pyetja specifike për urologun." }},
  { id:"urgjence", label:"Urgjencë", service:"Urgjencë / Specialist përkatës", fields:{
    reason:"Cili është indikacioni për udhëzim urgjent?",
    history:"Koha e fillimit dhe përkeqësimit, simptoma alarmi.",
    vitals:"TA, pulsi, frekuenca respiratore, temperatura, SpO₂, GCS sipas matjeve.",
    therapy:"Ndërhyrjet dhe barnat e administruara me kohë dhe dozë." }},
  { id:"oftalmologji", label:"Oftalmologji", service:"Oftalmologji", fields:{
    history:"Ndryshime të shikimit, kohëzgjatja, dhimbja, traumat, përdorimi i lenteve.",
    exam:"Mprehtësia vizuale dhe gjetjet okulare vetëm nëse janë matur." }},
  { id:"psikiatri", label:"Psikiatri", service:"Psikiatri", fields:{
    history:"Shqetësimet, kohëzgjatja, faktorët shoqërues dhe historiku relevant.",
    question:"Qëllimi i konsultës dhe urgjenca klinike." }},
  ...ADDITIONAL_TEMPLATES
];

export function applyTemplate(r: Referral, t: Template): Referral {
  // Shablloni vendos vetëm shërbimin nëse ai është bosh.
  // Udhëzimet mjekësore shfaqen në panelin e ndihmës, JO në dokument.
  if (!t.service || r.toService.trim()) return { ...r };
  return { ...r, toService: t.service };
}

export interface WritingSuggestion {
  field: keyof Referral;
  label: string;
  note: string;
}

/** Rregulla lokale udhëzuese: nuk vendosin diagnozë dhe nuk dërgojnë tekst te serveri. */
export function clinicalSuggestions(reason: string): WritingSuggestion[] {
  const v = reason.toLocaleLowerCase("sq").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const general: WritingSuggestion[] = [
    { field:"history", label:"Anamneza", note:"Shënoni fillimin, kohëzgjatjen, ecurinë dhe simptomat shoqëruese." },
    { field:"exam", label:"Ekzaminimi", note:"Dokumentoni vetëm gjetjet që keni ekzaminuar." }
  ];
  if (/gjoks|palpit|zemr|dispne|frym|rrahje/.test(v))
    return [...general,
      { field:"vitals", label:"Parametrat vitalë", note:"Përfshini TA, pulsin dhe SpO₂ nëse janë matur." },
      { field:"diagnostics", label:"EKG / analiza", note:"Përshkruani EKG-në dhe analizat vetëm nëse janë kryer." }];
  if (/bark|abdomin|vjell|diarr|diar|nauze/.test(v))
    return [...general,
      { field:"vitals", label:"Parametrat vitalë", note:"Përfshini temperaturën dhe shenjat vitale nëse janë matur." },
      { field:"exam", label:"Ekzaminimi abdominal", note:"Përshkruani lokalizimin, mbrojtjen muskulore dhe shenjat peritoneale, vetëm nëse janë ekzaminuar." }];
  if (/marramend|dhimbje koke|parez|kriz|neurol/.test(v))
    return [...general,
      { field:"exam", label:"Statusi neurologjik", note:"Përshkruani orientimin, deficitet fokale dhe gjetjet relevante nëse janë vlerësuar." }];
  return reason.trim().length >= 3 ? general : [];
}
