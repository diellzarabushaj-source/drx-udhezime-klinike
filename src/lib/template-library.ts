import type { Template } from "./referral";

/**
 * Libraria DRX për Udhëzime.
 * Përshkrimet e mëposhtme janë PYETJE/UDHËZIME, jo të dhëna të pacientit.
 * Nuk përmban diagnoza të përllogaritura, gjetje të shpikura apo receta.
 */
interface GuideEntry {
  id: string;
  label: string;
  category: string;
  service: string;
  history: string;
  exam: string;
  diagnostics: string;
  request: string;
  keywords: string[];
}

const GUIDES: GuideEntry[] = [
  {
    "id": "palpitacione",
    "label": "Palpitacione",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Fillimi, kohëzgjatja, ritmi i ndier, precipituesit, sinkopa ose presinkopa",
    "exam": "TA, pulsi, ritmi, perfuzioni dhe shenjat e dekompensimit nëse janë vlerësuar",
    "diagnostics": "EKG, hemogram, elektrolite, TSH sipas ekzaminimeve të kryera",
    "request": "Vlerësim i ritmit dhe nevojës për monitorim të mëtejshëm",
    "keywords": [
      "rrahje zemre",
      "takikardi"
    ]
  },
  {
    "id": "dhimbje-gjoksi",
    "label": "Dhimbje torakale",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Fillimi, karakteri, intensiteti, kohëzgjatja, rrezatimi, provokimi dhe simptomat shoqëruese",
    "exam": "Shenjat vitale, auskultimi, perfuzioni; shenjat e alarmit nëse janë vlerësuar",
    "diagnostics": "EKG, troponina, imazheria vetëm nëse janë kryer, me orën e marrjes",
    "request": "Vlerësim i dhimbjes torakale sipas prioritizimit klinik",
    "keywords": [
      "anginë",
      "gjoks",
      "angina"
    ]
  },
  {
    "id": "hipertension",
    "label": "Hipertension arterial",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Vlerat e dokumentuara, trajtimi kronik, aderenca, simptomat dhe dëmtimi i mundshëm i organeve",
    "exam": "TA e përsëritur, pulsi dhe statusi klinik sipas matjes",
    "diagnostics": "Kreatinina, kaliumi, urina, EKG nëse janë kryer",
    "request": "Vlerësim dhe optimizim i trajtimit të hipertensionit",
    "keywords": [
      "tension",
      "i10"
    ]
  },
  {
    "id": "insuficience-kardiake",
    "label": "Dyshim / ndjekje për insuficiencë kardiake",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Dispnea, ortopnea, edema, toleranca në ushtrim, ecuria, terapia aktuale",
    "exam": "Pesha, edema, auskultimi, frymëmarrja, pulsi nëse janë vlerësuar",
    "diagnostics": "EKG, natriuretikët, eko zemre, funksioni renal sipas të dhënave",
    "request": "Vlerësim kardiologjik për simptomat dhe planin e mëtejshëm",
    "keywords": [
      "zemër",
      "hf",
      "dispne"
    ]
  },
  {
    "id": "fibrilacion-atrial",
    "label": "Fibrilacion atrial – konsultë",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Episodet, kohëfillimi, simptomat, antikoagulimi dhe faktorët e rrezikut",
    "exam": "Pulsi, ritmi, TA, statusi hemodinamik sipas vlerësimit",
    "diagnostics": "EKG e datuar, funksioni renal, elektrolitet sipas disponueshmërisë",
    "request": "Vlerësim i menaxhimit të ritmit/frekuencës dhe antikoagulimit",
    "keywords": [
      "aritmi",
      "af",
      "atrial"
    ]
  },
  {
    "id": "sinkope-kardiale",
    "label": "Sinkopë – vlerësim kardiologjik",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Rrethanat e episodit, kohëzgjatja, rikuperimi, prodromi, barnat",
    "exam": "Shenjat vitale, ortostatizmi nëse është vlerësuar",
    "diagnostics": "EKG dhe testet e kryera, jo të supozuara",
    "request": "Vlerësim i shkakut kardiak të mundshëm të episodit",
    "keywords": [
      "humbje vetëdije",
      "syncope"
    ]
  },
  {
    "id": "murmur-kardiak",
    "label": "Zhurmë kardiake",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Kur u zbulua, simptomat, historia familjare, ecuria",
    "exam": "Lokalizimi dhe karakteri i zhurmës vetëm nëse janë dëgjuar",
    "diagnostics": "Ekokardiografia, EKG nëse disponohen",
    "request": "Vlerësim i zhurmës kardiake dhe nevojës për ekzaminime",
    "keywords": [
      "murmur",
      "auskultim"
    ]
  },
  {
    "id": "edema-periferike",
    "label": "Edema periferike",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Fillimi, simetria, progresioni, dispnea, barnat dhe sëmundjet shoqëruese",
    "exam": "Lokalizimi i edemës, pesha, TA dhe auskultimi nëse janë matur",
    "diagnostics": "Funksioni renal, analiza urinare, EKG sipas të dhënave",
    "request": "Vlerësim i edemave me fokus etiologjinë kardiovaskulare",
    "keywords": [
      "ënjtje",
      "edeme"
    ]
  },
  {
    "id": "dispne-kardiologji",
    "label": "Dispne – konsultë kardiologjike",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Fillimi, në pushim/sforcim, ortopnea, PND, dhe simptomat shoqëruese",
    "exam": "FR, SpO₂, TA, auskultimi dhe perfuzioni nëse janë vlerësuar",
    "diagnostics": "EKG, eko, radiografia, natriuretikët nëse janë kryer",
    "request": "Vlerësim i shkakut të dispnesë sipas të dhënave klinike",
    "keywords": [
      "frymëmarrje",
      "ortopne"
    ]
  },
  {
    "id": "kontroll-kardiologjik",
    "label": "Ndjekje kardiologjike",
    "category": "Kardiologji",
    "service": "Kardiologji",
    "history": "Diagnoza e konfirmuar, ndërhyrjet, simptomat e reja, adherenca",
    "exam": "Matjet aktuale dhe gjetjet e dokumentuara",
    "diagnostics": "Krahasimi me ekzaminimet e mëparshme nëse ekzistojnë",
    "request": "Rivlerësim specialistik i gjendjes dhe terapisë",
    "keywords": [
      "kontroll",
      "followup"
    ]
  },
  {
    "id": "cefale",
    "label": "Cefale / dhimbje koke",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Fillimi, tipi, shpeshtësia, përkeqësimi, simptomat neurologjike dhe shenjat alarmi",
    "exam": "Statusi neurologjik dhe fundoskopia vetëm nëse janë kryer",
    "diagnostics": "Imazheria dhe analizat nëse ekzistojnë",
    "request": "Vlerësim neurologjik i cefalesë dhe planit diagnostik",
    "keywords": [
      "migrenë",
      "kokë"
    ]
  },
  {
    "id": "migrene",
    "label": "Migrenë",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Frekuenca e krizave, aura, nxitësit, efektet në funksionim dhe barnat e marra",
    "exam": "Ekzaminimi neurologjik nëse është kryer",
    "diagnostics": "Ditari i dhimbjes dhe ekzaminimet e disponueshme",
    "request": "Vlerësim i nevojës për trajtim akut/profilaktik",
    "keywords": [
      "hemikrania"
    ]
  },
  {
    "id": "marramendje",
    "label": "Marramendje / vertigo",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Kohëzgjatja, episodet, nxitja nga pozicioni, simptomat vestibulare e neurologjike",
    "exam": "Ekzaminimi neurologjik dhe vestibular nëse është kryer",
    "diagnostics": "EKG/imazheria/teste të tjera kur janë kryer",
    "request": "Sqarim i etiologjisë së marramendjes",
    "keywords": [
      "vertigo",
      "trullim"
    ]
  },
  {
    "id": "parestezi",
    "label": "Parestezi dhe mpirje",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Shpërndarja, lateraliteti, fillimi, progresioni dhe dobësia shoqëruese",
    "exam": "Forca, ndjeshmëria, refleksat dhe koordinimi kur janë testuar",
    "diagnostics": "Glicemia, B12, ENMG, imazheria nëse ekzistojnë",
    "request": "Vlerësim i çrregullimit të ndjeshmërisë",
    "keywords": [
      "mpirje",
      "neuropati"
    ]
  },
  {
    "id": "deficit-fokal",
    "label": "Deficit neurologjik fokal",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Koha e fundit pa simptoma, fillimi i saktë, ecuria dhe simptomat shoqëruese",
    "exam": "Vlerësimi fokal, vetëdija, parametrat vitalë sipas matjes",
    "diagnostics": "Glicemia dhe ekzaminimet urgjente vetëm kur janë kryer",
    "request": "Vlerësim neurologjik urgjent sipas rrugës institucionale",
    "keywords": [
      "insult",
      "stroke",
      "parezë"
    ]
  },
  {
    "id": "konvulsione",
    "label": "Konvulsione / kriza epileptike",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Përshkrimi nga dëshmitarët, kohëzgjatja, rikuperimi, faktorët nxitës",
    "exam": "Vetëdija, statusi neurologjik dhe shenjat e dëmtimit sipas vlerësimit",
    "diagnostics": "Glicemia, elektrolitet, EEG/imazheria nëse janë kryer",
    "request": "Vlerësim i krizës dhe planifikim i ndjekjes neurologjike",
    "keywords": [
      "epilepsi",
      "seizure"
    ]
  },
  {
    "id": "tremor",
    "label": "Tremor",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Fillimi, pushim/veprim, progresioni, barnat dhe ndikimi funksional",
    "exam": "Lloji i tremorit dhe gjetjet neurologjike vetëm nëse janë ekzaminuar",
    "diagnostics": "TSH dhe teste të tjera sipas ekzaminimeve",
    "request": "Vlerësim neurologjik i tremorit",
    "keywords": [
      "dridhje"
    ]
  },
  {
    "id": "dhimbje-neuropatike",
    "label": "Dhimbje neuropatike",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Karakteri djegës/shpues, shpërndarja, kohëzgjatja dhe trajtimet",
    "exam": "Ndjeshmëria, forca dhe refleksat nëse janë testuar",
    "diagnostics": "ENMG, analiza metabolike, imazheri sipas të dhënave",
    "request": "Vlerësim i mundësisë së neuropatisë dhe menaxhimit të dhimbjes",
    "keywords": [
      "nerv",
      "neuropati"
    ]
  },
  {
    "id": "kujtesa",
    "label": "Çrregullime të kujtesës",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Fillimi, ecuria, funksionimi ditor, historiku i barnave, informanti",
    "exam": "Vlerësimi kognitiv kur është bërë",
    "diagnostics": "Analizat dhe imazheria e disponueshme",
    "request": "Vlerësim i ankesave kognitive",
    "keywords": [
      "demencë",
      "kognitiv"
    ]
  },
  {
    "id": "radikulopati-neuro",
    "label": "Radikulopati",
    "category": "Neurologji",
    "service": "Neurologji",
    "history": "Shpërndarja e dhimbjes, parestezitë, dobësia, shenjat alarmi",
    "exam": "Forca, refleksat, ndjeshmëria nëse janë testuar",
    "diagnostics": "Imazheria dhe ENMG nëse janë kryer",
    "request": "Vlerësim neurologjik i simptomave radikulare",
    "keywords": [
      "shiatik",
      "radikulare"
    ]
  },
  {
    "id": "kolle-kronike",
    "label": "Kollë kronike",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Kohëzgjatja, produktiviteti, hemoptizia, refluksi, duhani dhe barnat",
    "exam": "FR, auskultimi, SpO₂ vetëm nëse janë vlerësuar",
    "diagnostics": "Radiografia, spirometria dhe analizat e kryera",
    "request": "Vlerësim i etiologjisë së kollës persistente",
    "keywords": [
      "kollë",
      "respirator"
    ]
  },
  {
    "id": "astma",
    "label": "Astmë / dyshim për astmë",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Frekuenca e simptomave, nxitësit, simptomat natën, inhalatorët",
    "exam": "Auskultimi, FR, SpO₂, PEF nëse janë matur",
    "diagnostics": "Spirometria me bronkodilatator, sipas të dhënave",
    "request": "Vlerësim i kontrollit të simptomave respiratore",
    "keywords": [
      "fishkëllimë",
      "wheezing"
    ]
  },
  {
    "id": "spok",
    "label": "SPOK / COPD",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Dispnea, kollë, duhanpirja, ekzacerbimet dhe trajtimi me inhalatorë",
    "exam": "FR, SpO₂, auskultimi, pesha nëse janë matur",
    "diagnostics": "Spirometria, radiografia, gazrat e gjakut nëse disponohen",
    "request": "Vlerësim i COPD dhe terapisë inhalatore",
    "keywords": [
      "bpok",
      "copd"
    ]
  },
  {
    "id": "pneumoni",
    "label": "Dyshim për pneumoni",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Temperatura, kolla, dispnea, kohëzgjatja dhe faktorët e rrezikut",
    "exam": "FR, SpO₂, temperatura, auskultimi sipas matjes",
    "diagnostics": "Radiografia, hemograma, CRP nëse janë kryer",
    "request": "Vlerësim i infeksionit të dyshuar të traktit të poshtëm respirator",
    "keywords": [
      "infeksion mushkri"
    ]
  },
  {
    "id": "hemoptizi",
    "label": "Hemoptizi",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Sasia, kohëfillimi, përsëritja, antikoagulantët, simptomat",
    "exam": "Stabiliteti hemodinamik dhe respirator sipas vlerësimit",
    "diagnostics": "Hemograma, radiografia/CT nëse ekzistojnë",
    "request": "Vlerësim i hemoptizisë sipas urgjencës klinike",
    "keywords": [
      "gjak në sputum"
    ]
  },
  {
    "id": "apne-gjumi",
    "label": "Dyshim për apne obstruktive të gjumit",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Gërhitja, apnetë e vërejtura, përgjumja, faktorët e rrezikut",
    "exam": "BMI, TA, rrugët e sipërme të frymëmarrjes sipas ekzaminimit",
    "diagnostics": "Polisomnografia/oksimetria nëse janë bërë",
    "request": "Vlerësim i çrregullimit të frymëmarrjes gjatë gjumit",
    "keywords": [
      "osa",
      "sleep apnea"
    ]
  },
  {
    "id": "dispne-pulmo",
    "label": "Dispne – konsultë pulmonare",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Fillimi, përkeqësimi, ekspozimet, kolla, dhimbja torakale",
    "exam": "FR, SpO₂, auskultimi nëse janë vlerësuar",
    "diagnostics": "Radiografia, spirometria dhe analiza sipas disponueshmërisë",
    "request": "Vlerësim pulmonar i dispnesë",
    "keywords": [
      "frymëmarrje",
      "oksigjen"
    ]
  },
  {
    "id": "nodul-pulmonar",
    "label": "Nodul pulmonar në imazheri",
    "category": "Pulmologji",
    "service": "Pulmologji",
    "history": "Indikacioni dhe data e imazherisë, duhani, simptomat, historiku",
    "exam": "Statusi respirator sipas ekzaminimit",
    "diagnostics": "Përshkrimi i raportit radiologjik pa riinterpretim",
    "request": "Vlerësim i gjetjes imazherike pulmonare",
    "keywords": [
      "nodul",
      "mushkëri"
    ]
  },
  {
    "id": "dhimbje-abdominale",
    "label": "Dhimbje abdominale",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Lokalizimi, fillimi, karakteri, ushqimi, jashtëqitja, alarmet",
    "exam": "Ekzaminimi abdominal sipas gjetjeve të vërtetuara",
    "diagnostics": "Hemogrami, urinaliza, US/CT nëse ekzistojnë",
    "request": "Vlerësim i simptomave abdominale",
    "keywords": [
      "bark",
      "abdomen"
    ]
  },
  {
    "id": "refluks",
    "label": "Refluks gastroezofageal",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Urthi, regurgitimi, disfagia, rënia në peshë, trajtimet",
    "exam": "Gjetjet abdominale nëse janë ekzaminuar",
    "diagnostics": "Endoskopia dhe testet sipas disponueshmërisë",
    "request": "Vlerësim i simptomave të refluksit",
    "keywords": [
      "gerd",
      "urth"
    ]
  },
  {
    "id": "dispepsi",
    "label": "Dispepsi",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Dhimbja epigastrike, lidhja me ushqimin, barna AINS, alarmet",
    "exam": "Ekzaminimi abdominal sipas vlerësimit",
    "diagnostics": "H. pylori, endoskopia/analizat vetëm nëse janë kryer",
    "request": "Vlerësim i dispepsisë",
    "keywords": [
      "gastrit",
      "epigastr"
    ]
  },
  {
    "id": "diarre-kronike",
    "label": "Diarre kronike",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Kohëzgjatja, shpeshtësia, gjaku, humbja në peshë, udhëtimet",
    "exam": "Hidratimi, abdomeni dhe parametrat vitalë sipas vlerësimit",
    "diagnostics": "Analizat e feçeve, hemograma, CRP, endoskopia nëse kryhen",
    "request": "Vlerësim i diarresë persistente",
    "keywords": [
      "jashtëqitje",
      "diarre"
    ]
  },
  {
    "id": "konstipacion",
    "label": "Konstipacion",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Ndryshimi i ritmit, barnat, gjakderdhja, simptomat alarmuese",
    "exam": "Ekzaminimi abdominal dhe rektal nëse janë kryer",
    "diagnostics": "Ekzaminimet përkatëse sipas të dhënave",
    "request": "Vlerësim i konstipacionit të vazhdueshëm",
    "keywords": [
      "kapsllëk"
    ]
  },
  {
    "id": "hemorragji-gastro",
    "label": "Gjakderdhje gastrointestinale",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Melena/hematokezia, fillimi, sasia, antikoagulantët",
    "exam": "TA, pulsi, perfuzioni, stabiliteti sipas vlerësimit",
    "diagnostics": "Hemograma, koagulimi dhe ekzaminimet e kryera",
    "request": "Vlerësim urgjent i gjakderdhjes së raportuar",
    "keywords": [
      "melena",
      "hematokezi"
    ]
  },
  {
    "id": "enzima-hepatike",
    "label": "Rritje e enzimave hepatike",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Koha e zbulimit, alkooli, barnat, historiku hepatik",
    "exam": "Ikteri, abdomeni sipas ekzaminimit",
    "diagnostics": "ALT/AST/ALP/bilirubina me njësi dhe datë, ekografia kur ekziston",
    "request": "Vlerësim i devijimit të testeve hepatike",
    "keywords": [
      "transaminaza",
      "hepatit"
    ]
  },
  {
    "id": "ikter",
    "label": "Ikter",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Fillimi, urina e errët, feçet, dhimbja, barnat",
    "exam": "Ekzaminimi për ikter dhe abdomen sipas gjetjeve",
    "diagnostics": "Bilirubina, enzimat hepatike, US nëse janë kryer",
    "request": "Vlerësim i ikterit dhe etiologjisë",
    "keywords": [
      "verdhëz"
    ]
  },
  {
    "id": "disfagi",
    "label": "Disfagi",
    "category": "Gastroenterologji",
    "service": "Gastroenterologji",
    "history": "Ushqimi i ngurtë/i lëngshëm, progresioni, aspirimi, humbje në peshë",
    "exam": "Statusi oro-faringeal sipas ekzaminimit",
    "diagnostics": "Endoskopia, imazheria sipas disponueshmërisë",
    "request": "Vlerësim i çrregullimit të gëlltitjes",
    "keywords": [
      "vështirësi gëlltitje"
    ]
  },
  {
    "id": "dm2",
    "label": "Diabet mellitus tip 2",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Kohëzgjatja, glicemitë, hipoglikemitë, terapia dhe komplikimet",
    "exam": "TA, pesha, këmbët diabetike nëse janë ekzaminuar",
    "diagnostics": "HbA1c, kreatinina, UACR, lipidet me datë kur ekzistojnë",
    "request": "Vlerësim i kontrollit glicemik dhe planit të trajtimit",
    "keywords": [
      "diabet",
      "sheqer"
    ]
  },
  {
    "id": "hiperglikemi",
    "label": "Hiperglikemi",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Vlerat e sakta, koha, simptomat dhe terapia në përdorim",
    "exam": "Hidratimi, shenjat vitale dhe vetëdija nëse janë vlerësuar",
    "diagnostics": "Glicemia, ketonet, gazrat nëse janë kryer",
    "request": "Vlerësim i hiperglikemisë sipas prioritetit klinik",
    "keywords": [
      "glukoze",
      "diabet"
    ]
  },
  {
    "id": "hipoglikemi",
    "label": "Hipoglikemi",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Vlera e dokumentuar, simptomat, ora, barna dhe përsëritja",
    "exam": "Vetëdija, shenjat vitale dhe rikontrolli sipas matjes",
    "diagnostics": "Glicemitë e serisë kur disponohen",
    "request": "Vlerësim i episodeve hipoglikemike dhe faktorëve",
    "keywords": [
      "sheqer ulët"
    ]
  },
  {
    "id": "hipotiroidizem",
    "label": "Hipotiroidizëm",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Simptomat, terapia, aderenca, shtatzënia e mundshme",
    "exam": "TA, pesha, tiroidja nëse janë ekzaminuar",
    "diagnostics": "TSH, FT4 me datë dhe njësi kur ekzistojnë",
    "request": "Vlerësim dhe rishikim i terapisë tiroide",
    "keywords": [
      "tiroide",
      "tsh"
    ]
  },
  {
    "id": "hipertiroidizem",
    "label": "Hipertiroidizëm",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Palpitacionet, humbja e peshës, tremori, barnat",
    "exam": "Pulsi, TA, tiroidja sipas ekzaminimit",
    "diagnostics": "TSH, FT4/FT3 dhe US sipas të dhënave",
    "request": "Vlerësim i funksionit tiroide dhe simptomave",
    "keywords": [
      "thyrotoxicosis"
    ]
  },
  {
    "id": "nodul-tiroide",
    "label": "Nodul tiroide",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Kur u konstatua, simptoma kompresive, histori familjare",
    "exam": "Përmasa/palpimi sipas ekzaminimit",
    "diagnostics": "TSH dhe raporti US me klasifikimin e shkruar nëse ekziston",
    "request": "Vlerësim i nodulit tiroide",
    "keywords": [
      "gusha",
      "tiroide"
    ]
  },
  {
    "id": "obezitet",
    "label": "Menaxhim i obezitetit",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Trajektorja e peshës, sëmundjet shoqëruese, terapitë e mëparshme",
    "exam": "Pesha, gjatësia, BMI i matur/llogaritur saktë",
    "diagnostics": "HbA1c, lipidet, funksioni hepatik sipas disponueshmërisë",
    "request": "Vlerësim për trajtim të personalizuar të obezitetit",
    "keywords": [
      "mbipesha",
      "bmi"
    ]
  },
  {
    "id": "osteoporoze",
    "label": "Osteoporozë / frakturë fragjiliteti",
    "category": "Endokrinologji",
    "service": "Endokrinologji",
    "history": "Frakturat, rëniet, menopauza, glukokortikoidet, historiku",
    "exam": "Pesha, qëndrimi, dhimbja dhe mobiliteti sipas vlerësimit",
    "diagnostics": "DEXA, kalciumi, vitamina D sipas analizave",
    "request": "Vlerësim i rrezikut frakturar dhe trajtimit",
    "keywords": [
      "dexa",
      "kocka"
    ]
  },
  {
    "id": "femije-temperature",
    "label": "Fëmijë me temperaturë",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Mosha, kohëzgjatja, temperaturat e matura, vaksinimi, ushqyerja",
    "exam": "Gjendja e përgjithshme, hidratimi dhe shenjat vitale sipas ekzaminimit",
    "diagnostics": "Analizat dhe ekzaminimet e kryera",
    "request": "Vlerësim pediatrik i temperaturës dhe simptomave",
    "keywords": [
      "febril",
      "ethe"
    ]
  },
  {
    "id": "femije-kolle",
    "label": "Fëmijë me kollë",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Kohëzgjatja, frymëmarrja, ushqyerja, kontaktet dhe vaksinimi",
    "exam": "FR, SpO₂, tirazhi, auskultimi nëse janë vlerësuar",
    "diagnostics": "Analizat dhe imazheria nëse janë bërë",
    "request": "Vlerësim i simptomave respiratore pediatrike",
    "keywords": [
      "bronkit",
      "kollitje"
    ]
  },
  {
    "id": "femije-diarre",
    "label": "Diarre / të vjella te fëmija",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Numri i episodeve, marrja e lëngjeve, diureza dhe gjaku",
    "exam": "Hidratimi, pesha dhe shenjat vitale sipas ekzaminimit",
    "diagnostics": "Elektrolitet dhe testet sipas disponueshmërisë",
    "request": "Vlerësim pediatrik i diarresë/vjelljeve",
    "keywords": [
      "gastroenterit",
      "vjellje"
    ]
  },
  {
    "id": "femije-dhimbje-barku",
    "label": "Dhimbje barku te fëmija",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Lokalizimi, kohëzgjatja, temperatura, defekimi, oreksi",
    "exam": "Ekzaminimi abdominal dhe shenjat peritoneale nëse janë kontrolluar",
    "diagnostics": "Urinaliza, hemograma dhe imazheria e kryer",
    "request": "Vlerësim i dhimbjes abdominale te fëmija",
    "keywords": [
      "abdomen",
      "pediatri"
    ]
  },
  {
    "id": "femije-rritje",
    "label": "Vlerësim i rritjes",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Matjet serike, ushqyerja, lindja, kronologjia, historia familjare",
    "exam": "Gjatësia, pesha dhe percentilet sipas matjeve të vërteta",
    "diagnostics": "Analizat e rritjes kur disponohen",
    "request": "Vlerësim i rritjes dhe zhvillimit",
    "keywords": [
      "percentile",
      "gjatësi"
    ]
  },
  {
    "id": "femije-zhvillim",
    "label": "Vonesa e zhvillimit",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Aftësitë sipas moshës, regresi, lindja dhe historia familjare",
    "exam": "Ekzaminimi i zhvillimit sipas vlerësimit",
    "diagnostics": "Testet e dëgjimit/shikimit dhe ekzaminime të tjera kur ekzistojnë",
    "request": "Vlerësim multidisiplinar i zhvillimit",
    "keywords": [
      "zhvillim",
      "sjellje"
    ]
  },
  {
    "id": "femije-anemi",
    "label": "Anemi te fëmija",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Ushqyerja, simptomat, gjakderdhja, sëmundjet e mëparshme",
    "exam": "Pesha, zbehja dhe statusi klinik sipas vlerësimit",
    "diagnostics": "Hb, MCV, ferritina sipas analizave",
    "request": "Vlerësim i anemisë pediatrike",
    "keywords": [
      "hekur",
      "hb"
    ]
  },
  {
    "id": "femije-otit",
    "label": "Otit / otalgji te fëmija",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Fillimi, temperatura, rrjedhja nga veshi, trajtimet",
    "exam": "Otoskopia nëse është kryer",
    "diagnostics": "Testet e dëgjimit sipas indikacionit dhe disponueshmërisë",
    "request": "Vlerësim ORL/pediatrik i otalgjisë",
    "keywords": [
      "vesh",
      "otalgji"
    ]
  },
  {
    "id": "femije-rash",
    "label": "Skuqje / rash pediatrik",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Fillimi, përhapja, temperatura, barnat e reja dhe kontakti",
    "exam": "Morfologjia, mukozat dhe gjendja e përgjithshme nëse janë vlerësuar",
    "diagnostics": "Analizat sipas kontekstit dhe ekzaminimeve",
    "request": "Vlerësim i erupsionit kutan pediatrik",
    "keywords": [
      "lëkurë",
      "alergji"
    ]
  },
  {
    "id": "femije-astme",
    "label": "Fishkëllimë / wheezing pediatrik",
    "category": "Pediatri",
    "service": "Pediatri",
    "history": "Episodet, nxitësit, simptomat natën, trajtimet",
    "exam": "FR, SpO₂, tirazhi dhe auskultimi nëse janë kontrolluar",
    "diagnostics": "Testet pulmonare sipas moshës nëse janë kryer",
    "request": "Vlerësim i episodeve të wheezing",
    "keywords": [
      "asma",
      "bronkiolit"
    ]
  },
  {
    "id": "abdomen-akut",
    "label": "Abdomen akut",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Ora e fillimit, lokalizimi, migrimi, vjelljet, defekimi, historia kirurgjike",
    "exam": "TA, pulsi, abdomeni, peritonizmi sipas ekzaminimit",
    "diagnostics": "Analizat dhe imazheria me orë kur janë bërë",
    "request": "Vlerësim urgjent kirurgjikal i dhimbjes abdominale",
    "keywords": [
      "appendicit",
      "apendiks"
    ]
  },
  {
    "id": "hernia",
    "label": "Hernie abdominale",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Lokalizimi, kohëzgjatja, reduktueshmëria, simptomat e bllokimit",
    "exam": "Ekzaminimi i masës nëse është kryer",
    "diagnostics": "US dhe ekzaminime të tjera nëse disponohen",
    "request": "Vlerësim kirurgjikal i hernies",
    "keywords": [
      "inguinale",
      "umbilikale"
    ]
  },
  {
    "id": "kolecistit",
    "label": "Dhimbje në hipokondrin e djathtë",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Lidhja me ushqimin, temperatura, vjelljet, ikteri, ecuria",
    "exam": "Abdomeni, Murphy nëse është vlerësuar",
    "diagnostics": "US abdominale, hemograma, CRP, analizat hepatike nëse bëhen",
    "request": "Vlerësim për patologji biliare",
    "keywords": [
      "fshikëz tëmthi",
      "kolikë biliare"
    ]
  },
  {
    "id": "plage",
    "label": "Plagë / dëmtim i indeve të buta",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Mekanizmi, ora, kontaminimi, statusi i vaksinimit sipas kartelës",
    "exam": "Dimensionet, thellësia dhe neurovaskulariteti sipas ekzaminimit",
    "diagnostics": "Imazheria nëse indikohet dhe është kryer",
    "request": "Vlerësim kirurgjikal i plagës dhe nevojës për ndërhyrje",
    "keywords": [
      "laceracion",
      "cut"
    ]
  },
  {
    "id": "absces",
    "label": "Absces / infeksion i indeve të buta",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Fillimi, progresioni, temperatura, diabeti, trajtimi i mëparshëm",
    "exam": "Lokalizimi, madhësia dhe fluktuacioni nëse janë ekzaminuar",
    "diagnostics": "Analizat dhe US nëse janë kryer",
    "request": "Vlerësim i nevojës për trajtim kirurgjikal",
    "keywords": [
      "furunkul",
      "celulit"
    ]
  },
  {
    "id": "traume-ekstremiteti",
    "label": "Traumë e ekstremitetit",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Mekanizmi, ora, dhimbja, paaftësia funksionale",
    "exam": "Deformimi, lëkura, perfuzioni distal, ndjeshmëria dhe lëvizja kur janë vlerësuar",
    "diagnostics": "Radiografitë sipas imazherisë së kryer",
    "request": "Vlerësim traumatologjik i dëmtimit",
    "keywords": [
      "frakturë",
      "traumë"
    ]
  },
  {
    "id": "dhimbje-gjuri",
    "label": "Dhimbje gjuri",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Trauma, kohëzgjatja, bllokimi, paqëndrueshmëria",
    "exam": "ROM, efuzioni dhe stabiliteti nëse janë ekzaminuar",
    "diagnostics": "Radiografia ose MRI nëse ekzistojnë",
    "request": "Vlerësim ortopedik i dhimbjes së gjurit",
    "keywords": [
      "menisk",
      "ligament"
    ]
  },
  {
    "id": "dhimbje-shpatulle",
    "label": "Dhimbje shpatulle",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Fillimi, trauma, kufizimi funksional, dhimbja natën",
    "exam": "ROM aktiv/pasiv, testet e kryera",
    "diagnostics": "Radiografia, US/MRI kur ekzistojnë",
    "request": "Vlerësim ortopedik i simptomave të shpatullës",
    "keywords": [
      "rotator",
      "shpatull"
    ]
  },
  {
    "id": "dhimbje-mesi",
    "label": "Lumbalgji",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Kohëzgjatja, rrezatimi, trauma, deficitet, çrregullimi sfinkterik",
    "exam": "Statusi neurologjik dhe lëvizshmëria nëse janë vlerësuar",
    "diagnostics": "Imazheria kur ekziston",
    "request": "Vlerësim i lumbalgjisë persistente ose të komplikuar",
    "keywords": [
      "kurriz",
      "shiatik"
    ]
  },
  {
    "id": "frakture-kontroll",
    "label": "Kontroll pas frakturës / operacionit",
    "category": "Kirurgji dhe traumatologji",
    "service": "Kirurgji e përgjithshme",
    "history": "Data dhe lloji i ndërhyrjes, ecuria, dhimbja, rehabilitimi",
    "exam": "Plaga, ROM dhe statusi neurovaskular nëse janë vlerësuar",
    "diagnostics": "Imazheria e kontrollit kur ekziston",
    "request": "Vlerësim pasoperativ dhe udhëzim për rehabilitim",
    "keywords": [
      "ortopedi",
      "operim"
    ]
  },
  {
    "id": "angine",
    "label": "Tonsilit / dhimbje fyti",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Kohëzgjatja, temperatura, disfagia, episodet e përsëritura",
    "exam": "Orofaringu, qafa, hidrimi dhe frymëmarrja nëse janë ekzaminuar",
    "diagnostics": "Testet streptokoksike dhe hemograma nëse janë kryer",
    "request": "Vlerësim ORL i ankesave të fytit",
    "keywords": [
      "angina",
      "tonsilla"
    ]
  },
  {
    "id": "otitis",
    "label": "Dhimbje veshi / otit",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Fillimi, temperatura, otorrea, humbja e dëgjimit",
    "exam": "Otoskopia dhe mastoidi sipas ekzaminimit",
    "diagnostics": "Audiometria sipas ekzaminimeve",
    "request": "Vlerësim ORL i simptomave otike",
    "keywords": [
      "otalgji",
      "otit"
    ]
  },
  {
    "id": "sinusit",
    "label": "Sinusit",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Kohëzgjatja, sekrecioni, dhimbja faciale, trajtimi",
    "exam": "Hunda dhe sinuset sipas ekzaminimit",
    "diagnostics": "Imazheria kur është kryer dhe e nevojshme",
    "request": "Vlerësim ORL i simptomave sinonazale",
    "keywords": [
      "sinuse",
      "rinit"
    ]
  },
  {
    "id": "epistaksi",
    "label": "Epistaksis",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Kohëzgjatja dhe sasia, traumat, antikoagulantët, recidivat",
    "exam": "TA, pulsi, burimi i gjakderdhjes nëse është identifikuar",
    "diagnostics": "Hemograma/koagulimi nëse janë kryer",
    "request": "Vlerësim ORL i gjakderdhjes nazale",
    "keywords": [
      "gjak nga hunda"
    ]
  },
  {
    "id": "humbje-degjimi",
    "label": "Humbje dëgjimi",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Fillimi i papritur apo gradual, lateraliteti, zhurma, marramendja",
    "exam": "Otoskopia dhe testet bedside nëse janë bërë",
    "diagnostics": "Audiometria sipas disponueshmërisë",
    "request": "Vlerësim i ndryshimit të dëgjimit",
    "keywords": [
      "shurdhim",
      "audiologji"
    ]
  },
  {
    "id": "tinnitus",
    "label": "Tinnitus",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Lateraliteti, pulsatiliteti, fillimi, barna, dëgjimi",
    "exam": "Otoskopia dhe statusi neurologjik nëse janë vlerësuar",
    "diagnostics": "Audiometria/imazheria kur ekzistojnë",
    "request": "Vlerësim ORL i tinitusit",
    "keywords": [
      "zhurmë veshi"
    ]
  },
  {
    "id": "vertigo-orl",
    "label": "Vertigo – ORL",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Kohëzgjatja, nxitja nga lëvizja, simptomat otologjike",
    "exam": "Testet vestibulare dhe otoskopia nëse janë kryer",
    "diagnostics": "Audiometria sipas të dhënave",
    "request": "Vlerësim vestibular i marramendjes",
    "keywords": [
      "bppv",
      "labirint"
    ]
  },
  {
    "id": "ngjirje-zëri",
    "label": "Disfoni / ngjirje zëri",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Kohëzgjatja, duhani, disfagia, simptomat shoqëruese",
    "exam": "Orofaringu dhe qafa sipas ekzaminimit",
    "diagnostics": "Laringoskopia nëse është bërë",
    "request": "Vlerësim ORL i disfonisë",
    "keywords": [
      "laringit",
      "ze"
    ]
  },
  {
    "id": "alergji-hunde",
    "label": "Rinit alergjik",
    "category": "Otorinolaringologji",
    "service": "Otorinolaringologji",
    "history": "Sezonaliteti, nxitësit, kongjestioni, trajtimet",
    "exam": "Mukoza nazale nëse është vlerësuar",
    "diagnostics": "Testet alergjike nëse ekzistojnë",
    "request": "Vlerësim i simptomave nazale persistente",
    "keywords": [
      "teshtitje",
      "hundë"
    ]
  },
  {
    "id": "dismenorre",
    "label": "Dismenorre",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Mosha, modeli i ciklit, fillimi, ndikimi funksional, simptomat shoqëruese",
    "exam": "Ekzaminimi sipas pëlqimit dhe indikacionit, nëse është kryer",
    "diagnostics": "Testi i shtatzënisë, US nëse janë kryer",
    "request": "Vlerësim gjinekologjik i dhimbjes menstruale",
    "keywords": [
      "menstruacione",
      "cikël"
    ]
  },
  {
    "id": "gjakderdhje-uterine",
    "label": "Gjakderdhje uterine jonormale",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Sasia, kohëzgjatja, cikli, mundësia e shtatzënisë, barnat",
    "exam": "Shenjat vitale dhe ekzaminimi sipas vlerësimit",
    "diagnostics": "Hb, test shtatzënie, US sipas disponueshmërisë",
    "request": "Vlerësim i gjakderdhjes uterine",
    "keywords": [
      "menorragji",
      "metrorragji"
    ]
  },
  {
    "id": "amenorre",
    "label": "Amenorre",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Menarka, data e menstruacionit të fundit, shtatzënia e mundshme",
    "exam": "BMI dhe ekzaminimi sipas vlerësimit",
    "diagnostics": "Testi i shtatzënisë, TSH, prolaktina sipas analizave",
    "request": "Vlerësim i amenorresë",
    "keywords": [
      "mungesë cikli"
    ]
  },
  {
    "id": "dhimbje-pelvike",
    "label": "Dhimbje pelvike",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Fillimi, lateraliteti, cikli, simptoma urinare, shtatzënia e mundshme",
    "exam": "TA, pulsi, abdomeni dhe ekzaminimi sipas indikacionit",
    "diagnostics": "Test shtatzënie, urinalizë, US nëse janë kryer",
    "request": "Vlerësim gjinekologjik i dhimbjes pelvike",
    "keywords": [
      "legen",
      "adnex"
    ]
  },
  {
    "id": "leukorre",
    "label": "Sekrecion vaginal",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Kohëzgjatja, karakteri, kruajtja, dhimbja, ekspozimet",
    "exam": "Ekzaminimi sipas pëlqimit nëse është kryer",
    "diagnostics": "Strisho dhe teste mikrobiologjike nëse kryhen",
    "request": "Vlerësim i sekrecioneve vaginale",
    "keywords": [
      "vaginit",
      "sekrecion"
    ]
  },
  {
    "id": "shtatzani-kontroll",
    "label": "Konsultë obstetrike",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Java gestacionale e dokumentuar, shqetësimet dhe historiku obstetrik",
    "exam": "TA, pesha dhe gjetjet obstetrike nëse janë matur",
    "diagnostics": "US, urinaliza, analiza sipas kartelës",
    "request": "Vlerësim obstetrik dhe rekomandim për ndjekje",
    "keywords": [
      "prenatal",
      "graviditet"
    ]
  },
  {
    "id": "infertilitet",
    "label": "Infertilitet",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Kohëzgjatja, ciklet, shtatzënitë e mëparshme, historia e partnerit",
    "exam": "Ekzaminimi sipas indikacionit",
    "diagnostics": "Ekzaminimet hormonale, US dhe analizat ekzistuese",
    "request": "Vlerësim i infertilitetit",
    "keywords": [
      "fertilitet"
    ]
  },
  {
    "id": "menopauze",
    "label": "Simptoma peri-/postmenopauzale",
    "category": "Gjinekologji",
    "service": "Gjinekologji",
    "history": "Data e ciklit të fundit, simptomat, kundërindikacionet e mundshme",
    "exam": "TA, BMI dhe ekzaminimi kur është bërë",
    "diagnostics": "Testet sipas kontekstit klinik",
    "request": "Vlerësim i simptomave të menopauzës",
    "keywords": [
      "menopauzë",
      "klimakter"
    ]
  },
  {
    "id": "dizuri",
    "label": "Disuri / infeksion urinar",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Djegia, frekuenca, ethet, dhimbja në flank, shtatzënia kur relevante",
    "exam": "TA, temperatura dhe ndjeshmëria kostovertebrale nëse janë vlerësuar",
    "diagnostics": "Urinaliza, urinokultura, kreatinina sipas disponueshmërisë",
    "request": "Vlerësim urologjik i simptomave urinare",
    "keywords": [
      "uti",
      "urinim"
    ]
  },
  {
    "id": "kolike-renale",
    "label": "Kolikë renale",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Fillimi, lokalizimi, rrezatimi, hematuria, ethet, diureza",
    "exam": "Shenjat vitale, dhimbja dhe hidrimi sipas ekzaminimit",
    "diagnostics": "Urinaliza, kreatinina, US/CT sipas ekzaminimeve",
    "request": "Vlerësim i kolikës renale",
    "keywords": [
      "gur",
      "nephrolithiasis"
    ]
  },
  {
    "id": "hematuri",
    "label": "Hematuri",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Makro/mikroskopike, fillimi, dhimbja, barna, trauma",
    "exam": "Statusi hemodinamik dhe abdominal sipas vlerësimit",
    "diagnostics": "Urinaliza, urinokultura, imazheria nëse disponohen",
    "request": "Vlerësim i hematurisë",
    "keywords": [
      "gjak urinë"
    ]
  },
  {
    "id": "retension-urine",
    "label": "Retension urinar",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Fillimi, sasia e urinimit, dhimbja, prostata, barnat",
    "exam": "Distensioni suprapubik dhe gjendja nëse janë vlerësuar",
    "diagnostics": "Ekografia, kreatinina dhe matjet e kryera",
    "request": "Vlerësim i retensionit urinar",
    "keywords": [
      "urinim pengesë"
    ]
  },
  {
    "id": "funksion-renal",
    "label": "Dëmtim i funksionit renal",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Vlerat bazale, trendi i kreatininës, diureza, barnat nefrotoksike",
    "exam": "TA, statusi i volumit, edema sipas vlerësimit",
    "diagnostics": "Kreatinina/eGFR, elektrolitet, urinaliza me datë",
    "request": "Vlerësim nefrologjik i funksionit renal",
    "keywords": [
      "kreatininë",
      "ckd",
      "aki"
    ]
  },
  {
    "id": "proteinuri",
    "label": "Proteinuri / albuminuri",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Historiku i diabetit, hipertensionit, sëmundjeve renale",
    "exam": "TA, edema dhe statusi klinik nëse janë vlerësuar",
    "diagnostics": "ACR/PCR, urinaliza, eGFR sipas disponueshmërisë",
    "request": "Vlerësim i proteinurisë",
    "keywords": [
      "albuminë",
      "urina"
    ]
  },
  {
    "id": "luts",
    "label": "Simptoma të traktit urinar të poshtëm",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Frekenca, nokturia, jetësimi, ndjenja e zbrazjes, barnat",
    "exam": "Abdomeni dhe prostata vetëm nëse janë ekzaminuar",
    "diagnostics": "Urinaliza, PSA sipas indikacionit dhe disponueshmërisë",
    "request": "Vlerësim i simptomave obstruktive urinare",
    "keywords": [
      "prostatë",
      "nokturi"
    ]
  },
  {
    "id": "inkontinence",
    "label": "Inkontinencë urinare",
    "category": "Urologji dhe nefrologji",
    "service": "Urologji",
    "history": "Urgjenca, episodet, nxitësit, ndikimi në jetën e përditshme",
    "exam": "Ekzaminimi neurologjik/pelvik sipas indikacionit",
    "diagnostics": "Urinaliza dhe ditari i urinimit nëse ekzistojnë",
    "request": "Vlerësim i inkontinencës urinare",
    "keywords": [
      "urinë",
      "pelvike"
    ]
  },
  {
    "id": "ekzeme",
    "label": "Ekzemë / dermatit",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Fillimi, vendndodhja, kruajtja, ekspozimet, trajtimet",
    "exam": "Morfologjia dhe shpërndarja e lezioneve sipas ekzaminimit",
    "diagnostics": "Testet alergjike nëse janë kryer",
    "request": "Vlerësim dermatologjik i dermatitis",
    "keywords": [
      "rash",
      "ekzemë"
    ]
  },
  {
    "id": "psoriaze",
    "label": "Psoriazë",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Kohëzgjatja, sipërfaqja, trajtimet, simptomat artikulare",
    "exam": "Shpërndarja dhe morfologjia sipas ekzaminimit",
    "diagnostics": "Analizat sipas trajtimeve aktuale",
    "request": "Vlerësim i ashpërsisë dhe menaxhimit të psoriazës",
    "keywords": [
      "pllaka",
      "lëkurë"
    ]
  },
  {
    "id": "akne",
    "label": "Akne",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Fillimi, cikli, trajtimet e provuara, cikatrizimi",
    "exam": "Tipet e lezioneve sipas ekzaminimit",
    "diagnostics": "Testet hormonale vetëm nëse janë bërë",
    "request": "Vlerësim i aknesë dhe zgjedhjeve terapeutike",
    "keywords": [
      "puçrra"
    ]
  },
  {
    "id": "lezion-pigmentuar",
    "label": "Lezion i pigmentuar",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Ndryshimi i ngjyrës, përmasës, gjakderdhja dhe historiku",
    "exam": "Përmasa, pamja dhe dermoskopia vetëm kur janë bërë",
    "diagnostics": "Histopatologjia nëse ekziston",
    "request": "Vlerësim i lezionit të pigmentuar",
    "keywords": [
      "nishan",
      "nevus"
    ]
  },
  {
    "id": "urtikarie",
    "label": "Urtikarie",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Fillimi, kohëzgjatja e elementeve, ekspozimet, barnat",
    "exam": "Lëkura, mukozat dhe frymëmarrja nëse janë vlerësuar",
    "diagnostics": "Testet sipas anamnezës dhe ekzaminimeve",
    "request": "Vlerësim i urtikaries",
    "keywords": [
      "alergji",
      "kruarje"
    ]
  },
  {
    "id": "alopeci",
    "label": "Alopeci / rënie flokësh",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Shpërndarja, fillimi, stresi, dietat, barnat",
    "exam": "Skalpi dhe modeli i humbjes sipas ekzaminimit",
    "diagnostics": "Hemograma, ferritina, TSH sipas të dhënave",
    "request": "Vlerësim i alopecisë",
    "keywords": [
      "flokë",
      "rrënie"
    ]
  },
  {
    "id": "ulcere-kutane",
    "label": "Ulçerë kutane",
    "category": "Dermatologji",
    "service": "Dermatologji",
    "history": "Kohëzgjatja, diabeti, insuficienca venoze, trajtimi",
    "exam": "Përmasa, thellësia, infeksioni dhe perfuzioni sipas ekzaminimit",
    "diagnostics": "Doppler/analizat nëse kryhen",
    "request": "Vlerësim i plagës kronike dhe menaxhimit",
    "keywords": [
      "plagë",
      "ulcer"
    ]
  },
  {
    "id": "sy-kuq",
    "label": "Sy i kuq",
    "category": "Oftalmologji",
    "service": "Oftalmologji",
    "history": "Fillimi, dhimbja, fotofobia, sekrecioni, lentet",
    "exam": "Mprehtësia vizuale dhe ekzaminimi okular nëse është kryer",
    "diagnostics": "Testet okulare vetëm kur ekzistojnë",
    "request": "Vlerësim okulistik i syrit të skuqur",
    "keywords": [
      "konjunktivit"
    ]
  },
  {
    "id": "ulje-shikimi",
    "label": "Ulja e shikimit",
    "category": "Oftalmologji",
    "service": "Oftalmologji",
    "history": "Fillim i papritur/gradual, njëanshëm/dyanshëm, dhimbja",
    "exam": "Mprehtësia vizuale, pupilat sipas ekzaminimit",
    "diagnostics": "Testet e kryera, imazheria nëse ekziston",
    "request": "Vlerësim i ndryshimit të shikimit",
    "keywords": [
      "verbëri",
      "shikim"
    ]
  },
  {
    "id": "dhimbje-syri",
    "label": "Dhimbje okulare",
    "category": "Oftalmologji",
    "service": "Oftalmologji",
    "history": "Fillimi, trauma, fotofobia, lentet, simptomat neurologjike",
    "exam": "Acuity dhe statusi okular sipas ekzaminimit",
    "diagnostics": "Testet okulare sipas të dhënave",
    "request": "Vlerësim okulistik i dhimbjes së syrit",
    "keywords": [
      "oftalmike"
    ]
  },
  {
    "id": "diabet-retine",
    "label": "Kontroll i retinës te diabeti",
    "category": "Oftalmologji",
    "service": "Oftalmologji",
    "history": "Kohëzgjatja e diabetit, vlerat e HbA1c, problemet vizuale",
    "exam": "Mprehtësia vizuale kur është matur",
    "diagnostics": "Raportet e mëparshme fundoskopia/OCT nëse ekzistojnë",
    "request": "Vlerësim për retinopati diabetike",
    "keywords": [
      "fundus",
      "retinë"
    ]
  },
  {
    "id": "trup-huaj-sy",
    "label": "Dyshim për trup të huaj në sy",
    "category": "Oftalmologji",
    "service": "Oftalmologji",
    "history": "Mekanizmi, koha, përdorimi i mbrojtjes, shikimi",
    "exam": "Integriteti okular vetëm sipas ekzaminimit të sigurt",
    "diagnostics": "Ekzaminimet e kryera pa manipulim të pasigurt",
    "request": "Vlerësim urgjent okulistik i traumës së dyshuar",
    "keywords": [
      "traumë",
      "okul"
    ]
  },
  {
    "id": "ankth",
    "label": "Ankth",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Fillimi, episodet, precipituesit, funksionimi, medikamentet",
    "exam": "Statusi mendor sipas intervistës dhe ekzaminimit",
    "diagnostics": "Testet për shkaqe somatike nëse janë kryer",
    "request": "Vlerësim psikiatrik i simptomave të ankthit",
    "keywords": [
      "panik",
      "anxiety"
    ]
  },
  {
    "id": "depresion",
    "label": "Simptoma depresive",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Kohëzgjatja, gjumi, oreksi, funksionimi, rreziku vetëdëmtues",
    "exam": "Statusi mendor dhe vlerësimi i sigurisë sipas intervistës",
    "diagnostics": "Pyetësorët/analizat vetëm nëse janë kryer",
    "request": "Vlerësim specialistik i simptomave depresive",
    "keywords": [
      "depression",
      "humor"
    ]
  },
  {
    "id": "insomni",
    "label": "Insomni",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Modeli i gjumit, kohëzgjatja, barna, substancat dhe ndikimi ditor",
    "exam": "Statusi mendor dhe fizik sipas vlerësimit",
    "diagnostics": "Ditari i gjumit/analizat nëse ekzistojnë",
    "request": "Vlerësim i vështirësive të gjumit",
    "keywords": [
      "pagjumësi"
    ]
  },
  {
    "id": "panik",
    "label": "Episod paniku",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Kohëzgjatja e episodit, simptomat somatike, nxitësit, barnat",
    "exam": "TA, pulsi dhe statusi sipas vlerësimit",
    "diagnostics": "EKG dhe ekzaminimet e kryera",
    "request": "Vlerësim i episodeve të panikut dhe diagnozave diferenciale",
    "keywords": [
      "panic"
    ]
  },
  {
    "id": "adhd",
    "label": "Vlerësim i vëmendjes / ADHD",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Simptomat në kontekste të ndryshme, mosha e fillimit, funksionimi",
    "exam": "Vlerësimi psikiatrik dhe zhvillimor kur është kryer",
    "diagnostics": "Pyetësorë/informacion nga mjedise të ndryshme nëse ekzistojnë",
    "request": "Vlerësim për çrregullim të vëmendjes",
    "keywords": [
      "hiperaktivitet",
      "fokus"
    ]
  },
  {
    "id": "krize-psikologjike",
    "label": "Krizë psikologjike",
    "category": "Psikiatri dhe psikologji",
    "service": "Psikiatri",
    "history": "Stresori, kohëfillimi, rreziku për veten/të tjerët, mbështetja",
    "exam": "Statusi mendor dhe siguria sipas vlerësimit",
    "diagnostics": "Ekzaminime somatike sipas të dhënave",
    "request": "Vlerësim urgjent i sigurisë dhe gjendjes psikike",
    "keywords": [
      "krizë",
      "stres"
    ]
  },
  {
    "id": "urgjenc-gjoks",
    "label": "Dhimbje gjoksi akute",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Ora e fillimit, simptomat shoqëruese, faktorët e rrezikut",
    "exam": "Shenjat vitale, perfuzioni, statusi sipas matjes",
    "diagnostics": "EKG dhe biomarkerët vetëm me datë/orë nëse kryhen",
    "request": "Vlerësim urgjent sipas protokollit institucional; mos shtyni trajtimin për formular",
    "keywords": [
      "acs",
      "infarkt"
    ]
  },
  {
    "id": "urgjenc-insult",
    "label": "Dyshim për insult akut",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Koha e fundit kur pacienti ishte pa simptoma, deficitet, antikoagulantët",
    "exam": "Vetëdija, glicemia, deficiti neurologjik sipas vlerësimit",
    "diagnostics": "Imazheria dhe analizat e disponueshme",
    "request": "Aktivizim urgjent i rrugës institucionale të insultit",
    "keywords": [
      "stroke",
      "pareze"
    ]
  },
  {
    "id": "urgjenc-dispne",
    "label": "Distres respirator",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Fillimi, përkeqësimi, sëmundjet dhe barnat",
    "exam": "FR, SpO₂, TA, pulsi, vetëdija sipas matjes",
    "diagnostics": "EKG/imazheria/analizat vetëm nëse janë kryer",
    "request": "Vlerësim urgjent i gjendjes respiratore; prioritizoni stabilizimin",
    "keywords": [
      "frymëmarrje",
      "hipoksi"
    ]
  },
  {
    "id": "urgjenc-anafilaksi",
    "label": "Dyshim për anafilaksi",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Ekspozimi, ora, simptomat kutane/respiratore/hemodinamike",
    "exam": "Rrugët e frymëmarrjes, pulsi, TA, SpO₂ sipas vlerësimit",
    "diagnostics": "Ekzaminimet e kryera; trajtimi nuk pret testet",
    "request": "Vlerësim urgjent sipas protokollit të anafilaksisë",
    "keywords": [
      "alergji",
      "shok"
    ]
  },
  {
    "id": "urgjenc-sepse",
    "label": "Dyshim për sepsë",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Burimi i dyshuar, fillimi, temperatura, faktorët e rrezikut",
    "exam": "Parametrat vitalë, vetëdija, perfuzioni sipas matjes",
    "diagnostics": "Hemograma, laktati, kulturat nëse janë kryer",
    "request": "Vlerësim urgjent për sepsë; mos vononi ndërhyrjet kritike",
    "keywords": [
      "infeksion",
      "sepsis"
    ]
  },
  {
    "id": "urgjenc-hiperglikemi",
    "label": "Hiperglikemi e rëndë",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Glicemia e matur, diureza, vjelljet, barna, kohëfillimi",
    "exam": "Vetëdija, hidrimi dhe shenjat vitale sipas ekzaminimit",
    "diagnostics": "Ketonet, elektrolitet, gazrat e gjakut vetëm kur janë kryer",
    "request": "Vlerësim urgjent i çrregullimit metabolik",
    "keywords": [
      "dka",
      "hhs",
      "diabet"
    ]
  },
  {
    "id": "urgjenc-konvulsione",
    "label": "Konvulsione aktive / të përsëritura",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Ora, kohëzgjatja, episodi, barnat, temperatura",
    "exam": "Vetëdija, frymëmarrja, glicemia dhe statusi sipas vlerësimit",
    "diagnostics": "Analizat sipas të dhënave të dokumentuara",
    "request": "Vlerësim urgjent dhe menaxhim sipas rrugës institucionale",
    "keywords": [
      "seizure",
      "epilepsi"
    ]
  },
  {
    "id": "urgjenc-hemorragji",
    "label": "Hemorragji akute",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Vendi, sasia e raportuar, fillimi, antikoagulimi",
    "exam": "TA, pulsi, perfuzioni, vetëdija sipas vlerësimit",
    "diagnostics": "Hb/koagulimi dhe testet e kryera",
    "request": "Vlerësim urgjent i hemorragjisë; trajtimi nuk duhet të vonohet",
    "keywords": [
      "gjakderdhje",
      "shok"
    ]
  },
  {
    "id": "urgjenc-femije",
    "label": "Fëmijë me shenja alarmi",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Mosha, ora e fillimit, ushqyerja, diureza, simptomat alarmuese",
    "exam": "FR, pulsi, temperatura, SpO₂, vetëdija sipas matjes",
    "diagnostics": "Glicemia dhe testet e kryera",
    "request": "Vlerësim urgjent pediatrik sipas protokollit",
    "keywords": [
      "pediatri",
      "ethe",
      "dehidrim"
    ]
  },
  {
    "id": "urgjenc-traume",
    "label": "Traumë madhore",
    "category": "Urgjencë",
    "service": "Urgjencë / Specialist përkatës",
    "history": "Mekanizmi, koha, simptomat, ndërhyrjet paraprake",
    "exam": "ABCDE dhe parametrat dokumentohen sipas vlerësimit",
    "diagnostics": "Imazheria dhe analizat vetëm kur janë kryer",
    "request": "Transferim/vlerësim urgjent sipas rrugës së traumës",
    "keywords": [
      "aksident",
      "traumë"
    ]
  },
  {
    "id": "anemi",
    "label": "Anemi",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Simptomat, gjakderdhja, dieta, sëmundjet kronike",
    "exam": "Gjendja, TA, pulsi, zbehja sipas vlerësimit",
    "diagnostics": "Hb, MCV, ferritina, B12 sipas analizave",
    "request": "Vlerësim etiologjik i anemisë",
    "keywords": [
      "hemoglobinë",
      "hekur"
    ]
  },
  {
    "id": "lodhje",
    "label": "Lodhje persistente",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Kohëzgjatja, gjumi, pesha, sëmundjet shoqëruese",
    "exam": "Matjet dhe gjetjet sipas ekzaminimit",
    "diagnostics": "Hemograma, TSH, glicemia sipas analizave të bëra",
    "request": "Vlerësim internistik i simptomave persistente",
    "keywords": [
      "dobësi",
      "fatigue"
    ]
  },
  {
    "id": "limfadenopati",
    "label": "Limfadenopati",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Kohëzgjatja, lokalizimi, infeksionet, simptomat sistemike",
    "exam": "Madhësia, konsistenca, shpërndarja nëse janë ekzaminuar",
    "diagnostics": "Hemograma, US, testet e kryera",
    "request": "Vlerësim i limfadenopatisë",
    "keywords": [
      "nyje",
      "gjëndra"
    ]
  },
  {
    "id": "dhimbje-kronike",
    "label": "Dhimbje kronike",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Lokalizimi, kohëzgjatja, intensiteti, ndikimi, trajtimet",
    "exam": "Funksioni dhe ekzaminimi fokal sipas vlerësimit",
    "diagnostics": "Imazheria/analizat kur ekzistojnë",
    "request": "Vlerësim multidisiplinar i dhimbjes",
    "keywords": [
      "algologji"
    ]
  },
  {
    "id": "rehabilitim",
    "label": "Fizioterapi / rehabilitim",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Diagnoza e vendosur, ndërhyrjet, kufizimi funksional, synimet",
    "exam": "ROM, forca, ecuria funksionale sipas matjeve",
    "diagnostics": "Imazheria dhe raportet postoperative nëse ekzistojnë",
    "request": "Vlerësim për planin e rehabilitimit",
    "keywords": [
      "fizioterapi",
      "terapi fizikale"
    ]
  },
  {
    "id": "rezultat-laboratorik",
    "label": "Rezultat laboratorik jashtë intervalit",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Vlera, njësi, datë, simptoma, barna, trendi",
    "exam": "Gjendja klinike dhe parametrat vitalë sipas vlerësimit",
    "diagnostics": "Bashkëngjitni vetëm rezultatet reale me intervalin laboratorik",
    "request": "Interpretim specialistik i rezultatit në kontekstin klinik",
    "keywords": [
      "analiza",
      "hemogram"
    ]
  },
  {
    "id": "ekografi",
    "label": "Udhëzim për ultrazë",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Vendndodhja, arsyeja, kohëzgjatja e simptomave",
    "exam": "Gjetjet fokale që janë ekzaminuar",
    "diagnostics": "Ekzaminimet paraprake nëse ekzistojnë",
    "request": "Ekzaminim ultrasonografik për pyetjen klinike të dokumentuar",
    "keywords": [
      "us",
      "echo",
      "imazheri"
    ]
  },
  {
    "id": "radiografi",
    "label": "Udhëzim për radiografi",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Lokalizimi, mekanizmi, kohëzgjatja dhe pyetja klinike",
    "exam": "Ekzaminimi fizik i zonës sipas vlerësimit",
    "diagnostics": "Imazheria e mëparshme nëse ka",
    "request": "Radiografi sipas indikacionit të përshkruar",
    "keywords": [
      "rx",
      "xray"
    ]
  },
  {
    "id": "kujdes-paliativ",
    "label": "Kujdes paliativ",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Diagnoza e konfirmuar, simptomat, qëllimet dhe dëshirat e pacientit",
    "exam": "Statusi funksional dhe simptomat sipas vlerësimit",
    "diagnostics": "Rezultatet relevante kur ekzistojnë",
    "request": "Vlerësim i nevojave të kujdesit paliativ",
    "keywords": [
      "dhimbje",
      "fund jete"
    ]
  },
  {
    "id": "hematologji",
    "label": "Konsultë hematologjike",
    "category": "Mjekësi familjare dhe të tjera",
    "service": "Mjekësi interne",
    "history": "Simptomat, trendi i hemogramës, gjakderdhja, medikamentet",
    "exam": "Statusi klinik dhe organomegalia nëse është vlerësuar",
    "diagnostics": "Hemograma dhe strishoja me datë sipas disponueshmërisë",
    "request": "Vlerësim hematologjik i anomalive të dokumentuara",
    "keywords": [
      "leukocite",
      "trombocite"
    ]
  }
];

export const ADDITIONAL_TEMPLATES: Template[] = GUIDES.map((g) => ({
  id: g.id,
  label: g.label,
  category: g.category,
  service: g.service,
  keywords: g.keywords,
  request: g.request,
  fields: {
    history: "Pyetni/dokumentoni: " + g.history + ".",
    exam: "Nëse janë ekzaminuar: " + g.exam + ".",
    diagnostics: "Dokumentoni vetëm rezultatet e kryera: " + g.diagnostics + ".",
    question: "Qëllimi i konsultës: " + g.request + ".",
  },
}));
