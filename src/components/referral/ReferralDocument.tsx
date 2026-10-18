import { DEFAULT_TITLE, formatDate, sexLabel, checkEssentials, type Referral } from "@/lib/referral";
import { findTemplateSlots, TEMPLATE_MARKER } from "@/lib/ready-template";

/** Printed transcription of the provided Kosovo consultation-referral grid.
 * It does not generate an official serial number, seal or institutional authorization. */
function Line({ label, value = "" }: { label: string; value?: string }) {
  return (
    <div className="kos-line">
      <span className="kos-label">{label}</span>
      <span className="kos-value">{value}</span>
    </div>
  );
}

function NumberBoxes({ digits, count = 13 }: { digits: string; count?: number }) {
  const chars = digits.replace(/\s/g, "").slice(0, count).split("");
  return (
    <div className="kos-digits" aria-label="Numri personal">
      {Array.from({ length: count }, (_, i) => (
        <span className="kos-digit" key={i}>{chars[i] || ""}</span>
      ))}
    </div>
  );
}

function PaperText({ value }: { value: string }) {
  const text = value.trim();
  const parts: Array<{ text: string; unfinished: boolean }> = [];
  let last = 0;
  TEMPLATE_MARKER.lastIndex = 0;
  for (const match of text.matchAll(TEMPLATE_MARKER)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last,index), unfinished: false });
    parts.push({ text: match[0], unfinished: true });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), unfinished: false });
  return <div className="kos-written">{parts.map((part,index) =>
    part.unfinished
      ? <span key={index} className="kos-placeholder">{part.text}</span>
      : <span key={index}>{part.text}</span>
  )}</div>;
}

function Row({ title, value, codeLabel, codeValue, rightSmall }: {
  title: string; value: string; codeLabel?: string; codeValue?: string; rightSmall?: string;
}) {
  return (
    <div className="kos-clinical-row">
      <div className="kos-clinical-body">
        <div className="kos-row-title">{title}</div>
        <PaperText value={value} />
      </div>
      {codeLabel && (
        <div className="kos-code-box">
          <span className="kos-row-title">{codeLabel}</span>
          <div className="kos-code-value">{codeValue || ""}</div>
          {rightSmall && <span className="kos-code-note">{rightSmall}</span>}
        </div>
      )}
    </div>
  );
}

function joinValues(...parts: string[]) {
  return parts.map((p) => p.trim()).filter(Boolean).join("\n");
}

export function ReferralDocument({ r }: { r: Referral }) {
  const patientLast = r.patientName.trim().split(/\s+/);
  const surname = patientLast.length > 1 ? patientLast.pop() || "" : "";
  const given = patientLast.join(" ");
  const diagnosis = r.diagnosis.trim();
  const exam = joinValues(r.exam, r.vitals ? "Shenjat vitale: " + r.vitals : "", r.diagnostics ? "Ekzaminimet diagnostike: " + r.diagnostics : "");
  const purpose = joinValues(r.reason, r.question ? "Kërkesa për konsultë: " + r.question : "");
  const pending = findTemplateSlots(r).length;
  const missing = checkEssentials(r).filter((item) => !item.done).length;
  const issued = formatDate(r.issueDate);
  const issueParts = issued.split(".");
  return (
    <article className="a4 kos-form" aria-label="Model elektronik i formularit të udhëzimit për konsultim">
      <div className="kos-top-strip">
        <span>MODEL ELEKTRONIK · DRX</span>
        <span>UDHËZIMI PËR KONSULTIM / UPUT ZA KONSULTACIJU</span>
        <span>DM 0101</span>
      </div>
      <div className="kos-title-line">
        <strong>{(r.title || DEFAULT_TITLE).toUpperCase()} / UPUT ZA KONSULTACIJU</strong>
        <span className="kos-title-note">Jo formular origjinal i lëshuar nga autoritetet</span>
        {(pending > 0 || missing > 0) && <span className="kos-unfinished-note">DRAFT I PAPLOTË · {pending} hapësira për plotësim/konfirmim · {missing} rubrika bazë pa verifikim</span>}
      </div>

      <div className="kos-twin-tables">
        <div className="kos-outline kos-person-side">
          <Line label="Institucioni shëndetësor / Zdravstvena ustanova" value={r.fromInstitution} />
          <Line label="Njësia / Odeljenje" value={r.fromDepartment} />
          <Line label="Emri / Ime" value={given || r.patientName} />
          <Line label="Mbiemri / Prezime" value={surname} />
          <Line label="Emri i prindit / Ime roditelja" value={r.parentName} />
          <Line label="Komuna / Opština" value={r.municipality} />
          <Line label="Alergjitë / Alergije" value={r.allergies} />
        </div>
        <div className="kos-outline kos-id-side">
          <div className="kos-number-row">
            <span className="kos-label">Nr. personal / Lični broj</span>
            <NumberBoxes digits={r.patientId} />
          </div>
          <Line label="Datëlindja / Datum rođenja" value={r.patientDob ? formatDate(r.patientDob) : r.patientAge ? r.patientAge + " vjeç" : ""} />
          <Line label="Mosha / Starost" value={r.patientAge} />
          <Line label="Gjinia / Pol" value={sexLabel(r.patientSex)} />
          <Line label="Adresa / Adresa" value={r.patientAddress} />
          <Line label="Profesioni / Profesija" value={r.profession} />
          <Line label="Tel. / Telefon" value={r.patientContact} />
        </div>
      </div>
      <div className="kos-insurance-grid">
        <div className="kos-outline">
          <Line label="Sigurimi shëndetësor / Zdravstveno osiguranje" value={r.insuranceCompany} />
          <Line label="Kodi / Šifra" value={r.insuranceId} />
        </div>
        <div className="kos-outline kos-insurance-checks">
          <div className="kos-check-title">Kategoria e sigurimit / Kategorija osiguranja</div>
          <div className="kos-check-list">
            <span>Sigurim i përgjithshëm <b className="kos-square" /></span>
            <span>Pa sigurim <b className="kos-square" /></span>
            <span>Sigurim tjetër <b className="kos-square" /></span>
          </div>
        </div>
      </div>

      <div className="kos-referral-band kos-outline">
        <div>
          <span className="kos-row-title">Institucioni shëndetësor ku udhëzohet klienti / Zdravstvena institucija gde se upućuje pacijent</span>
          <PaperText value={r.toInstitution} />
        </div>
        <div>
          <span className="kos-row-title">Konsultanti / Konsulent</span>
          <PaperText value={r.toService} />
        </div>
      </div>

      <div className="kos-clinical-grid kos-outline">
        <Row title="Qëllimi i udhëzimit / Razlog uputa" value={purpose} />
        <Row title="Anamneza" value={r.history} />
        <Row title="Ekzaminimet / Eksaminacije" value={exam} codeLabel="Kodi / Šifra: ICD - 9" codeValue={r.icd9} />
        <Row title="Trajtimi i tanishëm / Sadašnji tretman" value={r.therapy} codeLabel="Kodi i barnave / Šifra lekova" codeValue={r.drugCode} />
        <Row title="Diagnozat e punës / Radne dijagnoze" value={diagnosis} codeLabel="Kodi / Šifra: ICD - 10" codeValue={r.icd} rightSmall={"ICPC: " + (r.icpc || "______")} />
      </div>

      <div className="kos-footer">
        <div className="kos-date-area">
          <div className="kos-footer-date">{(issueParts.length === 3 ? issueParts : ["", "", ""]).map((x, i) => <span key={i}>{x}</span>)}</div>
          <div className="kos-date-legend"><span>DD</span><span>MM</span><span>VVVV</span></div>
        </div>
        <div className="kos-place">Vendi / Mesto: <span>{r.municipality}</span></div>
        <div className="kos-signature">
          <div className="kos-signature-value">{r.physicianName}{r.physicianSpec ? ", " + r.physicianSpec : ""}</div>
          <div className="kos-signature-line" />
          <span>Nënshkrimi dhe faksimili i mjekut / Potpis i faksimil lekara</span>
        </div>
      </div>
      <div className="kos-footnote">Model elektronik për plotësim dhe printim · DRX · Pa numër serial, vulë apo certifikim institucional.</div>
    </article>
  );
}
