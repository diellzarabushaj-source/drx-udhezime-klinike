# DRX Udhëzime Klinike

**Aplikacion për përgatitjen e udhëzimeve specialistike në Kosovë**, i ndërtuar me React, TypeScript, Vite dhe GitHub. Nuk varet nga Lovable.

Ky version është **prototip klinik për testim me të dhëna fiktive**, jo sistem i certifikuar për dokumentacion real të pacientëve.

## Përdorimi: nga shablloni te udhëzimi A4

1. Kërko një diagnozë, simptomë ose specialitet (p.sh. `palpitacione`).
2. Zgjidh shabllonin përkatës nga **143 mundësi** (142 të përgatitura + formulari bosh), të organizuara në 15 kategori klinike.
3. Shtyp **Mbush formularin me shabllon**, kontrollo parapamjen dhe konfirmo **Prano dhe hape për plotësim**. Aplikacioni krijon tekste profesionale për arsyen e konsultës, anamnezën, ekzaminimin, shenjat vitale, ekzaminimet diagnostike, trajtimin dhe pyetjen për specialistin.
4. Plotëso një nga një hapësirat **[plotëso: …]** dhe **[konfirmo: …]**. Gjithçka që nuk dihet mbetet qartë e paverifikuar; nuk krijohen gjetje normale, analiza, terapi apo diagnoza të supozuara.
5. Nëse ke shumë të dhëna të përmbledhura, fut një shënim si `palpitacione prej 3 ditësh; TA: 150/90; EKG: e kryer` dhe shtyp **Përgatit draftin**. Vlerat e shkruara mund të plotësojnë rubrikat përkatëse, duke ruajtur tekstin që ekziston.
6. Para printimit/PDF, kontrollo listën e rubrikave bazë, shënuesit e paplotësuar dhe prioritetin. Dokumenti A4 ka pamjen e formularit referues dygjuhësh, por **nuk është formular zyrtar**.

### Çfarë bën dhe nuk bën automatizimi

| Veprimi | Sjellja |
|---|---|
| Struktura e konsultës | Përgatitet automatikisht sipas shabllonit |
| Vlerat e dokumentuara (p.sh. TA, EKG) | Kalojnë nga shënimi i mjekut pas konfirmimit |
| Teksti që mjeku ka shkruar më parë | Ruhet; nuk mbishkruhet |
| Diagnoza dhe ICD-10 | Nuk supozohen; zgjedhja e kodit bëhet nga mjeku |
| Alergjitë / mungesa e tyre | Nuk deklarohen pa konfirmim |
| Barnat dhe dozat | Nuk gjenerohen automatikisht pa të dhëna të sakta |
| Shablloni urgjent | Shfaq paralajmërim nëse prioriteti është jo-urgjent |
| Dokument i paplotë | Shënohet si **DRAFT I PAPLOTË** dhe kërkohet konfirmim para kopjimit/printimit |

Katalogu ICD-10 i përfshirë është një **katalog orientues lokal** (jo zëvendësim për klasifikimin zyrtar); kërkimi toleron ë/ç dhe variantet pa diakritikë. Mjeku konfirmon çdo kod.

## Siguria dhe privatësia

- Të dhënat e formularit mbahen vetëm në memorien e përkohshme të shfletuesit.
- Nuk ekzistojnë backend, llogari, databazë pacientësh apo ruajtje me `localStorage` / `sessionStorage`.
- Nuk dërgohen të dhënat klinike në modele AI, API të largëta apo platforma analitike.
- **Mos përdorni të dhëna reale të pacientëve derisa të përfundojë auditimi teknik, ligjor dhe institucional.** Printimi dhe clipboard i nënshtrohen rregullave të pajisjes dhe mjedisit të përdoruesit.
- Siguria duhet verifikuar në publikimin real, përfshirë konfigurimin e hostimit, politikat e aksesit dhe pajtueshmërinë me rregullat për mbrojtjen e të dhënave.

## Zhvillimi

Kërkohet Node.js 22+.

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

Kontrollet automatike në GitHub Actions ekzekutojnë TypeScript, testet e njësive, testet e ndërfaqes dhe build-in në çdo ndryshim të degës `main`. Testet kontrollojnë gjithashtu që shabllonet të mos shpikin të dhëna dhe që mjeku t'i konfirmojë ndryshimet.

## Kufizime para pilotimit klinik

Ende nevojiten: testim manual i printimit A4 me shënime shumë të gjata në Chrome/Edge/Safari, rishikim i gjuhës klinike të çdo shablloni nga mjekë specialistë, validim i kodimit ICD-10 dhe miratim institucional. Kalimi i testeve automatike **nuk është certifikim mjekësor**.
