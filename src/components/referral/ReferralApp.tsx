import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Building2, User, Stethoscope, FileText, ClipboardCheck, Printer, Copy, Check, Eraser, Sparkles,
  RotateCcw, ShieldCheck, Eye, PencilLine, CircleAlert, CircleCheck, UserRound, LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  TEMPLATES, applyTemplate, checkEssentials, cleanText, clinicalSuggestions, emptyReferral, todayISO, toPlainText,
  type Referral, type Urgency,
} from "@/lib/referral";
import { ReferralDocument } from "./ReferralDocument";
import icdCatalog from "@/data/icd-qkmf.json";

type K = keyof Referral;

const NAV = [
  { id: "sec-inst", label: "Institucionet", icon: Building2 },
  { id: "sec-patient", label: "Pacienti", icon: User },
  { id: "sec-clinical", label: "Përmbajtja klinike", icon: Stethoscope },
  { id: "sec-dx", label: "Diagnoza & pyetja", icon: FileText },
  { id: "sec-doc", label: "Mjeku udhëzues", icon: UserRound },
];

const selectCls =
  "flex h-9 w-full rounded-md border border-input bg-card px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function ReferralApp() {
  const [r, setR] = useState<Referral>(() => emptyReferral());
  const [view, setView] = useState<"form" | "preview">("form");
  const [copied, setCopied] = useState(false);
  const [templateId, setTemplateId] = useState("bosh");
  const [templateSearch, setTemplateSearch] = useState("");
  const [icdSearch, setIcdSearch] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setR((p) => (p.issueDate ? p : { ...p, issueDate: todayISO() }));
  }, []);

  const set = (k: K) => (v: string) => setR((p) => ({ ...p, [k]: v }));
  const checks = useMemo(() => checkEssentials(r), [r]);
  const activeTemplate = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0]!;
  const templateMatches = TEMPLATES.filter((t) => t.label.toLocaleLowerCase("sq").includes(templateSearch.toLocaleLowerCase("sq")));
  const suggestions = useMemo(() => clinicalSuggestions(r.reason), [r.reason]);
  const icdMatches = useMemo(() => {
    const q = icdSearch.toLocaleLowerCase("sq").trim();
    if (q.length < 2) return [];
    return icdCatalog.rows.filter((row) => [row.code, row.label_sq, ...row.aliases].some((v) => v.toLocaleLowerCase("sq").includes(q))).slice(0, 8);
  }, [icdSearch]);
  const done = checks.filter((c) => c.done).length;
  const pct = Math.round((done / checks.length) * 100);

  const flash = (msg: string) => { setNotice(msg); window.setTimeout(() => setNotice(""), 2200); };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(r));
      setCopied(true); flash("Teksti i udhëzimit u kopjua.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch { flash("Kopjimi nuk u lejua nga shfletuesi."); }
  };

  const cleanAll = () => {
    setR((p) => {
      const n = { ...p };
      (Object.keys(n) as K[]).forEach((k) => { if (typeof n[k] === "string" && k !== "urgency" && k !== "patientSex") (n as Record<string, string>)[k] = cleanText(n[k] as string); });
      return n;
    });
    flash("Formatimi u pastrua.");
  };

  const jump = (id: string) => {
    setView("form");
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const focusField = (k: string) => {
    setView("form");
    requestAnimationFrame(() => {
      const el = document.getElementById(`f-${k}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement | null)?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="print-flat min-h-screen bg-background lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="no-print hidden border-r border-sidebar-border bg-nav text-nav-ink lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="px-6 pt-7 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><Stethoscope className="h-5 w-5" /></div>
            <div>
              <div className="font-serif text-lg font-semibold leading-none">DRX</div>
              <div className="mt-1 text-xs tracking-wide opacity-70">Udhëzime</div>
            </div>
          </div>
        </div>
        <nav aria-label="Seksionet e formularit" className="space-y-0.5 px-3">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => jump(id)} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm opacity-85 transition hover:bg-sidebar-accent hover:opacity-100">
              <Icon className="h-4 w-4 shrink-0 opacity-70" />{label}
            </button>
          ))}
        </nav>
        <div className="mx-3 mt-6 rounded-md bg-sidebar-accent p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Plotësimi</span><span className="tabular-nums opacity-80">{done}/{checks.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-border">
            <div className="h-full rounded-full bg-sidebar-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="mt-auto p-5 text-xs leading-relaxed opacity-75">
          <ShieldCheck className="mb-2 h-4 w-4" />
          Të dhënat mbahen vetëm në këtë dritare dhe fshihen kur e mbyllni.
        </div>
      </aside>

      <div className="min-w-0">
        {/* Top bar */}
        <header className="no-print sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground lg:hidden"><Stethoscope className="h-4 w-4" /></div>
              <div className="min-w-0">
                <h1 className="truncate font-serif text-base font-semibold sm:text-lg">Udhëzim për konsultim</h1>
                <p className="hidden truncate text-xs text-muted-foreground sm:block">Hartoni, kontrolloni dhe printoni udhëzimin për specialistin</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={copy} aria-label="Kopjo si tekst">
                {copied ? <Check className="h-4 w-4 text-teal" /> : <Copy className="h-4 w-4" />}<span className="hidden md:inline">Kopjo tekstin</span>
              </Button>
              <Button size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /><span className="hidden sm:inline">Printo / PDF</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-border p-1.5 lg:hidden" role="tablist">
            {([["form", "Formulari", PencilLine], ["preview", "Pamja A4", Eye]] as const).map(([v, label, Icon]) => (
              <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
                className={cn("flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition", view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </header>

        <div role="status" aria-live="polite" className={cn("no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg transition", notice ? "opacity-100" : "pointer-events-none opacity-0")}>
          {notice}
        </div>

        <div className="print-flat xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* FORM */}
          <main className={cn("no-print min-w-0 space-y-5 px-4 py-6 sm:px-6", view === "preview" && "hidden xl:block")}>
            <p className="flex gap-2.5 rounded-lg border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <span>Ky prototip nuk i ruan të dhënat. Mos përdorni të dhëna reale të pacientëve derisa të verifikohet siguria dhe përputhshmëria institucionale.</span>
            </p>

            {/* Tools */}
            <Card icon={LayoutTemplate} title="Shabllone dhe mjete" subtitle="Shabllonet shtojnë vetëm pyetje udhëzuese, asnjë gjetje apo diagnozë.">
              <div className="space-y-3">
                <label className="block text-sm font-medium" htmlFor="template-search">Gjej shabllonin</label>
                <Input id="template-search" type="search" value={templateSearch} onChange={(e) => setTemplateSearch(e.target.value)} placeholder="Kardiologji, neurologji, pediatri, ORL…" autoComplete="off" />
                <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pb-1">
                  {templateMatches.map((t) => (
                    <Button key={t.id} type="button" variant={templateId === t.id ? "default" : "outline"} size="sm"
                      aria-pressed={templateId === t.id}
                      onClick={() => {
                        setTemplateId(t.id);
                        setR((p) => applyTemplate(p, t));
                        flash(t.id === "bosh" ? "Shabllon bosh i zgjedhur — të dhënat ruhen." : "U hap udhëzuesi për " + t.label + ".");
                      }}>
                      <LayoutTemplate className="h-3.5 w-3.5" />{t.label}
                    </Button>
                  ))}
                </div>
                {activeTemplate && activeTemplate.id !== "bosh" && (
                  <div className="rounded-md border border-teal/25 bg-teal-soft/40 p-3 text-sm">
                    <p className="font-semibold">Çfarë të dokumentoni për {activeTemplate.label}</p>
                    <p className="mt-1 mb-2 text-xs text-muted-foreground">Këto janë udhëzime për ju, nuk futen automatikisht në udhëzimin e pacientit.</p>
                    <ul className="space-y-2">
                      {Object.entries(activeTemplate.fields).map(([key, note]) => (
                        <li key={key} className="flex items-start justify-between gap-2">
                          <span>{note}</span>
                          <Button size="sm" type="button" variant="ghost" onClick={() => focusField(key)} className="shrink-0">Plotëso</Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <Button variant="secondary" size="sm" onClick={cleanAll}><Eraser className="h-4 w-4" />Pastro formatimin</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><RotateCcw className="h-4 w-4" />Pastro formularin</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Të fshihen të gjitha të dhënat?</AlertDialogTitle>
                      <AlertDialogDescription>Formulari do të kthehet në gjendjen fillestare. Ky veprim nuk mund të zhbëhet.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anulo</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { setR(emptyReferral(todayISO())); setTemplateId("bosh"); setTemplateSearch(""); setIcdSearch(""); flash("Formulari u pastrua."); }}>Po, pastroje</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>

            <Card id="sec-inst" icon={Building2} title="Institucionet dhe udhëzimi">
              <Grid>
                <Field k="title" label="Titulli / lloji i dokumentit" r={r} set={set} full hint="P.sh. Udhëzim për konsultim, Udhëzim urgjent" />
                <Field k="fromInstitution" label="Institucioni udhëzues" r={r} set={set} req placeholder="Emri i institucionit që lëshon udhëzimin" />
                <Field k="fromDepartment" label="Reparti / njësia" r={r} set={set} placeholder="P.sh. Mjekësia familjare" />
                <Field k="toInstitution" label="Drejtuar institucionit" r={r} set={set} placeholder="Institucioni pranues" />
                <Field k="toService" label="Specialiteti / shërbimi" r={r} set={set} req placeholder="P.sh. Kardiologji" />
                <div className="space-y-1.5">
                  <Label htmlFor="f-urgency">Urgjenca</Label>
                  <div id="f-urgency" role="radiogroup" aria-label="Urgjenca" className="grid grid-cols-3 gap-1 rounded-md border border-input bg-muted p-1">
                    {(["Rutine", "Prioritar", "Urgjent"] as Urgency[]).map((u) => (
                      <button key={u} type="button" role="radio" aria-checked={r.urgency === u} onClick={() => set("urgency")(u)}
                        className={cn("rounded px-2 py-1.5 text-xs font-medium transition", r.urgency === u ? (u === "Urgjent" ? "bg-urgent text-primary-foreground" : "bg-card text-foreground shadow-sm") : "text-muted-foreground hover:text-foreground")}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                <Field k="issueDate" label="Data e lëshimit" r={r} set={set} type="date" req />
              </Grid>
            </Card>

            <Card id="sec-patient" icon={User} title="Të dhënat e pacientit" subtitle="Shënoni vetëm të dhënat e nevojshme për konsultim.">
              <Grid>
                <Field k="patientName" label="Emri dhe mbiemri" r={r} set={set} req full autoComplete="off" />
                <Field k="patientDob" label="Datëlindja" r={r} set={set} type="date" hint="Ose shënoni moshën" />
                <Field k="patientAge" label="Mosha (vjet)" r={r} set={set} inputMode="numeric" placeholder="P.sh. 54" />
                <div className="space-y-1.5">
                  <Label htmlFor="f-patientSex">Gjinia</Label>
                  <select id="f-patientSex" className={selectCls} value={r.patientSex} onChange={(e) => set("patientSex")(e.target.value)}>
                    <option value="">— Zgjidhni —</option><option value="F">Femër</option><option value="M">Mashkull</option>
                  </select>
                </div>
                <Field k="patientId" label="Nr. personal (opsional)" r={r} set={set} autoComplete="off" />
                <Field k="patientContact" label="Kontakti (opsional)" r={r} set={set} autoComplete="off" />
                <Field k="insuranceId" label="Nr. i sigurimit (nëse kërkohet)" r={r} set={set} autoComplete="off" />
                <Field k="parentName" label="Emri i prindit (sipas formularit)" r={r} set={set} autoComplete="off" />
                <Field k="patientAddress" label="Adresa" r={r} set={set} autoComplete="off" />
                <Field k="municipality" label="Komuna / vendi" r={r} set={set} />
                <Field k="profession" label="Profesioni" r={r} set={set} />
                <Field k="insuranceCompany" label="Kompania e sigurimit (nëse ekziston)" r={r} set={set} />
              </Grid>
            </Card>

            <Card id="sec-clinical" icon={Stethoscope} title="Përmbajtja klinike" subtitle="Shkruani vetëm të dhëna të verifikuara. Rreshti i ri ruhet në dokument.">
              <div className="space-y-4">
                <Area k="reason" label="Arsyeja e udhëzimit" r={r} set={set} req rows={2} placeholder="Përshkruani shkurt pse po udhëzohet pacienti te specialisti." />
                {suggestions.length > 0 && (
                  <section className="rounded-lg border border-teal/25 bg-teal-soft/35 p-4" aria-label="Ndihma gjatë shkrimit">
                    <div className="mb-1 flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4" /> Ndihmë gjatë shkrimit</div>
                    <p className="mb-3 text-xs text-muted-foreground">Bazuar në tekstin e ankesës, kontrolloni nëse keni dokumentuar këto pika. Asnjë vlerë klinike nuk krijohet automatikisht.</p>
                    <ul className="space-y-2">
                      {suggestions.map((tip,i) => (
                        <li key={tip.field + i} className="flex items-start justify-between gap-3 text-sm">
                          <div><strong>{tip.label}</strong><p className="text-muted-foreground">{tip.note}</p></div>
                          <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={() => focusField(tip.field)}>Plotëso</Button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                <Area k="history" label="Anamneza" r={r} set={set} req rows={4} placeholder="Ankesat aktuale, fillimi dhe ecuria; sëmundjet e mëparshme dhe anamneza relevante." />
                <Area k="allergies" label="Alergjitë" r={r} set={set} req rows={1} placeholder="Shënoni alergjitë e njohura ose “Nuk ka alergji të njohura”." />
                <Area k="exam" label="Ekzaminimi objektiv" r={r} set={set} rows={3} placeholder="Gjetjet e fokusuara të ekzaminimit fizik." />
                <Area k="vitals" label="Shenjat vitale (opsionale)" r={r} set={set} rows={1} placeholder="TA, frekuenca kardiake, temperatura, SpO₂ — sipas matjes." />
                <Area k="diagnostics" label="Ekzaminimet diagnostike" r={r} set={set} rows={3} placeholder="Rezultatet laboratorike dhe imazherike me datë." />
                <Area k="therapy" label="Trajtimi aktual" r={r} set={set} rows={3} placeholder="Barnat me dozë dhe frekuencë; trajtime të tjera në vazhdim." />
              </div>
            </Card>

            <Card id="sec-dx" icon={FileText} title="Diagnoza e punës dhe pyetja">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
                  <Area k="diagnosis" label="Diagnoza e punës" r={r} set={set} req rows={2} placeholder="Diagnoza e punës sipas vlerësimit tuaj klinik." />
                  <div className="space-y-2">
                    <Field k="icd" label="Kodi ICD-10" r={r} set={set} placeholder="P.sh. I10" hint="Konfirmohet nga mjeku" />
                    <Label htmlFor="f-icdSearch">Kërko në katalogun DRX QKMF</Label>
                    <Input id="f-icdSearch" type="search" value={icdSearch} onChange={(e) => setIcdSearch(e.target.value)} placeholder="Shkruaj kodin ose termin" />
                    {icdMatches.length > 0 && (
                      <div className="max-h-56 overflow-y-auto rounded-md border bg-card p-1 text-xs" role="listbox" aria-label="Sugjerime ICD-10">
                        {icdMatches.map((c) => (
                          <button key={c.code} type="button" role="option" aria-selected={r.icd === c.code}
                            onClick={() => { set("icd")(c.code); setIcdSearch(c.code); flash("Kodi u zgjodh; kontrolloni diagnozën klinike."); }}
                            className="flex w-full items-start gap-2 rounded px-2 py-2 text-left hover:bg-muted focus-visible:bg-muted">
                            <strong>{c.code}</strong><span>{c.label_sq}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">Katalog i kufizuar me {icdCatalog.count} kode të shpeshta nga DRX; nuk përfshin tërë ICD-10. Kërkimi kryhet vetëm në pajisjen tuaj.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field k="icd9" label="Kodi ICD-9 (nëse përdoret)" r={r} set={set} />
                  <Field k="drugCode" label="Kodi i barnave" r={r} set={set} />
                  <Field k="icpc" label="Kodi ICPC" r={r} set={set} />
                </div>
                <Area k="question" label="Pyetja për konsulentin / konsultimi i kërkuar" r={r} set={set} req rows={3} placeholder="Çfarë kërkoni konkretisht nga specialisti? (vlerësim, konfirmim diagnoze, rekomandim trajtimi…)" />
              </div>
            </Card>

            <Card id="sec-doc" icon={UserRound} title="Mjeku udhëzues">
              <Grid>
                <Field k="physicianName" label="Emri dhe mbiemri" r={r} set={set} req placeholder="Dr. …" />
                <Field k="physicianSpec" label="Specializimi" r={r} set={set} placeholder="P.sh. Mjek familjar" />
                <Field k="physicianLicense" label="Nr. i licencës (opsional)" r={r} set={set} />
              </Grid>
              <p className="mt-3 text-xs text-muted-foreground">Nënshkrimi dhe vula vendosen me dorë në dokumentin e printuar.</p>
            </Card>

            <Checklist checks={checks} pct={pct} onPick={focusField} />
          </main>

          {/* PREVIEW */}
          <section aria-label="Pamja paraprake A4" className={cn("print-root min-w-0 print:border-0 border-l border-border bg-muted/50 xl:sticky xl:top-[61px] xl:h-[calc(100vh-61px)] xl:overflow-auto", view === "form" && "hidden xl:block")}>
            <div className="no-print flex items-center justify-between px-6 pt-5 pb-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />Pamja e drejtpërdrejtë · A4</span>
              <span className={cn("rounded-full px-2 py-0.5 font-medium", pct === 100 ? "bg-teal-soft text-teal" : "bg-warning-soft text-warning")}>{pct === 100 ? "Gati për lëshim" : `${checks.length - done} elemente mungojnë`}</span>
            </div>
            <ScaledPaper><ReferralDocument r={r} /></ScaledPaper>
          </section>
        </div>
      </div>
    </div>
  );
}

function ScaledPaper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => {
      const paperPx = 210 * 3.7795;
      setZoom(Math.min(1, (el.clientWidth - 56) / paperPx));
    });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="px-4 pb-10 sm:px-6">
      <div className="print-zoom mx-auto w-fit" style={{ zoom }}>{children}</div>
    </div>
  );
}

function Card({ id, icon: Icon, title, subtitle, children }: { id?: string; icon: typeof User; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="h-4 w-4" /></div>
        <div className="min-w-0">
          <h2 className="font-serif text-base font-semibold leading-tight">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const Grid = ({ children }: { children: ReactNode }) => <div className="grid gap-4 sm:grid-cols-2">{children}</div>;

interface FP { k: K; label: string; r: Referral; set: (k: K) => (v: string) => void; req?: boolean; placeholder?: string; hint?: string }

function LabelRow({ k, label, req }: { k: K; label: string; req?: boolean | undefined }) {
  return (
    <Label htmlFor={`f-${k}`} className="flex items-center gap-1">
      {label}{req && <span className="text-teal" aria-label="thelbësore">•</span>}
    </Label>
  );
}

function Field({ k, label, r, set, req, placeholder, hint, full, type = "text", ...rest }: FP & { full?: boolean; type?: string; autoComplete?: string; inputMode?: "numeric" }) {
  return (
    <div className={cn("space-y-1.5", full && "sm:col-span-2")}>
      <LabelRow k={k} label={label} req={req} />
      <Input id={`f-${k}`} type={type} value={r[k] as string} onChange={(e) => set(k)(e.target.value)} placeholder={placeholder} className="bg-card" aria-describedby={hint ? `h-${k}` : undefined} {...rest} />
      {hint && <p id={`h-${k}`} className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Area({ k, label, r, set, req, placeholder, rows = 3 }: FP & { rows?: number }) {
  return (
    <div className="space-y-1.5">
      <LabelRow k={k} label={label} req={req} />
      <Textarea id={`f-${k}`} rows={rows} value={r[k] as string} onChange={(e) => set(k)(e.target.value)} placeholder={placeholder} className="resize-y bg-card leading-relaxed" />
    </div>
  );
}

function Checklist({ checks, pct, onPick }: { checks: ReturnType<typeof checkEssentials>; pct: number; onPick: (k: string) => void }) {
  const missing = checks.filter((c) => !c.done);
  return (
    <Card icon={ClipboardCheck} title="Kontrolli para lëshimit" subtitle="Treguesi është informues; printimi mbetet gjithmonë i mundur.">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-teal transition-all" style={{ width: `${pct}%` }} /></div>
        <span className="text-sm font-semibold tabular-nums">{pct}%</span>
      </div>
      {missing.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-teal"><CircleCheck className="h-4 w-4" />Të gjitha elementet thelbësore janë plotësuar.</p>
      ) : (
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {checks.map((c) => (
            <li key={c.key}>
              <button type="button" onClick={() => onPick(c.key === "patientDob" ? "patientDob" : c.key)} className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition hover:bg-muted", c.done ? "text-muted-foreground" : "text-foreground")}>
                {c.done ? <CircleCheck className="h-4 w-4 shrink-0 text-teal" /> : <CircleAlert className="h-4 w-4 shrink-0 text-warning" />}
                <span className={cn(c.done && "line-through decoration-muted-foreground/40")}>{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}