import { CLINICAL_FIELDS, DEFAULT_TITLE, formatDate, sexLabel, type Referral } from "@/lib/referral";
import { cn } from "@/lib/utils";

function Meta({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[7.5pt] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 min-h-[1.4em] border-b border-paper-rule pb-1 text-[10pt] break-words", !value && "text-muted-foreground/50")}>
        {value || "—"}
      </div>
    </div>
  );
}

function Section({ n, title, value }: { n: number; title: string; value: string }) {
  return (
    <section className="doc-section mt-5">
      <h3 className="flex items-baseline gap-2 border-b border-paper-rule pb-1 font-serif text-[11pt] font-semibold text-primary">
        <span className="font-sans text-[8pt] font-medium tabular-nums text-teal">{String(n).padStart(2, "0")}</span>
        {title}
      </h3>
      <p className={cn("mt-2 whitespace-pre-wrap break-words", !value.trim() && "italic text-muted-foreground/60")}>
        {value.trim() || "Pa të dhëna të shënuara."}
      </p>
    </section>
  );
}

export function ReferralDocument({ r }: { r: Referral }) {
  const urgent = r.urgency === "Urgjent";
  const clinical = CLINICAL_FIELDS.filter(([k]) => k === "reason" || k === "history" || k === "allergies" || r[k].trim());
  let n = 0;
  return (
    <article className="a4" aria-label="Pamja e udhëzimit për printim">
      <header className="doc-keep flex items-start justify-between gap-6 border-b-2 border-primary pb-4">
        <div className="min-w-0">
          <div className="text-[8pt] font-medium uppercase tracking-[0.14em] text-muted-foreground">Institucioni udhëzues</div>
          <div className="mt-1 font-serif text-[12.5pt] font-semibold leading-tight break-words">{r.fromInstitution || "—"}</div>
          {r.fromDepartment && <div className="text-[9.5pt] text-muted-foreground">{r.fromDepartment}</div>}
        </div>
        <div className="shrink-0 text-right">
          <div className={cn("inline-block rounded-sm border px-2.5 py-1 text-[8pt] font-semibold uppercase tracking-[0.14em]",
            urgent ? "border-urgent text-urgent" : r.urgency === "Prioritar" ? "border-warning text-warning" : "border-teal text-teal")}>
            {r.urgency}
          </div>
          <div className="mt-2 text-[9pt] text-muted-foreground">Data: <span className="tabular-nums text-paper-ink">{formatDate(r.issueDate) || "—"}</span></div>
        </div>
      </header>

      <div className="doc-keep mt-6 text-center">
        <h1 className="font-serif text-[19pt] font-semibold tracking-[0.06em] text-primary">{(r.title || DEFAULT_TITLE).toUpperCase()}</h1>
        <p className="mt-1 text-[8pt] uppercase tracking-[0.18em] text-muted-foreground">Dokument klinik – model i përgatitur në DRX</p>
      </div>

      <div className="doc-keep mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
        <Meta label="Drejtuar institucionit" value={r.toInstitution} />
        <Meta label="Specialiteti / shërbimi" value={r.toService} />
      </div>

      <div className="doc-keep mt-5 rounded-sm bg-muted/60 p-4">
        <div className="mb-2 text-[8pt] font-semibold uppercase tracking-[0.14em] text-primary">Të dhënat e pacientit</div>
        <div className="grid grid-cols-6 gap-x-4 gap-y-3">
          <Meta className="col-span-3" label="Emri dhe mbiemri" value={r.patientName} />
          <Meta className="col-span-2" label={r.patientDob ? "Datëlindja" : "Mosha"} value={r.patientDob ? formatDate(r.patientDob) + (r.patientAge ? ` (${r.patientAge} vjeç)` : "") : r.patientAge ? `${r.patientAge} vjeç` : ""} />
          <Meta label="Gjinia" value={sexLabel(r.patientSex)} />
          {r.patientId && <Meta className="col-span-2" label="Nr. personal" value={r.patientId} />}
          {r.patientContact && <Meta className="col-span-2" label="Kontakti" value={r.patientContact} />}
          {r.insuranceId && <Meta className="col-span-2" label="Nr. i sigurimit" value={r.insuranceId} />}
        </div>
      </div>

      {clinical.map(([k, label]) => <Section key={k} n={++n} title={label} value={r[k]} />)}

      <section className="doc-section mt-5">
        <h3 className="flex items-baseline gap-2 border-b border-paper-rule pb-1 font-serif text-[11pt] font-semibold text-primary">
          <span className="font-sans text-[8pt] font-medium tabular-nums text-teal">{String(++n).padStart(2, "0")}</span>
          Diagnoza e punës
        </h3>
        <div className="mt-2 flex items-start justify-between gap-4">
          <p className={cn("min-w-0 whitespace-pre-wrap break-words", !r.diagnosis.trim() && "italic text-muted-foreground/60")}>{r.diagnosis.trim() || "Pa të dhëna të shënuara."}</p>
          <div className="shrink-0 rounded-sm border border-paper-rule px-2 py-0.5 text-[9pt]"><span className="text-muted-foreground">ICD-10 </span><span className="font-semibold tabular-nums">{r.icd.trim() || "—"}</span></div>
        </div>
      </section>

      <section className="doc-section mt-5 border-l-2 border-teal pl-4">
        <h3 className="font-serif text-[11pt] font-semibold text-primary">Pyetja për konsulentin / konsultimi i kërkuar</h3>
        <p className={cn("mt-2 whitespace-pre-wrap break-words", !r.question.trim() && "italic text-muted-foreground/60")}>{r.question.trim() || "Pa të dhëna të shënuara."}</p>
      </section>

      <footer className="doc-keep mt-10 grid grid-cols-2 gap-10">
        <div>
          <div className="text-[8pt] font-semibold uppercase tracking-[0.14em] text-primary">Mjeku udhëzues</div>
          <div className="mt-2 font-serif text-[11pt] font-semibold">{r.physicianName || "—"}</div>
          {r.physicianSpec && <div className="text-[9.5pt] text-muted-foreground">{r.physicianSpec}</div>}
          {r.physicianLicense && <div className="text-[9pt] text-muted-foreground">Nr. i licencës: {r.physicianLicense}</div>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><div className="h-16 border-b border-paper-ink/60" /><div className="mt-1 text-center text-[8pt] text-muted-foreground">Nënshkrimi</div></div>
          <div><div className="mx-auto h-16 w-16 rounded-full border border-dashed border-paper-ink/40" /><div className="mt-1 text-center text-[8pt] text-muted-foreground">Vula</div></div>
        </div>
      </footer>

      <p className="doc-keep mt-8 border-t border-paper-rule pt-2 text-center text-[7pt] text-muted-foreground">
        Model dokumenti i përgatitur nga mjeku në DRX. Nuk është formular zyrtar i lëshuar nga institucionet shtetërore.
      </p>
    </article>
  );
}