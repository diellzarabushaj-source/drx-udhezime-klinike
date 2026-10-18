import { describe, expect, it } from "vitest";
import { TEMPLATES, emptyReferral, templateCategory } from "./referral";
import { normalizeSearch, proposeQuickDraft } from "./smart-draft";

describe("DRX shabllonet klinike", () => {
  it("provides over 100 unique specialty templates", () => {
    expect(TEMPLATES.length).toBeGreaterThan(120);
    expect(new Set(TEMPLATES.map(t=>t.id)).size).toBe(TEMPLATES.length);
    expect(new Set(TEMPLATES.map(templateCategory)).size).toBeGreaterThan(10);
  });
  it("keeps recommendations separate from patient facts", () => {
    const r=emptyReferral();
    for(const t of TEMPLATES) {
      expect(t.id.length).toBeGreaterThan(0);
      expect(t.label.length).toBeGreaterThan(0);
      // A template alone never asserts a diagnosis, abnormal examination or ICD code.
      expect(r.diagnosis).toBe("");
      expect(r.icd).toBe("");
    }
  });
});

describe("DRX ndihmës i draftit", () => {
  const template = TEMPLATES.find(t=>t.id==="palpitacione")!;
  it("parses only explicitly stated facts into their proper fields", () => {
    const source = "palpitacione prej 3 ditësh; TA: 150/90; EKG: e kryer";
    const draft = proposeQuickDraft(emptyReferral(),template,source);
    expect(draft.next.toService).toBe("Kardiologji");
    expect(draft.next.reason).toContain("palpitacione prej 3 ditësh");
    expect(draft.next.history).toContain("palpitacione prej 3 ditësh");
    expect(draft.next.vitals).toBe("TA: 150/90");
    expect(draft.next.diagnostics).toBe("EKG: e kryer");
    expect(draft.next.question).toContain("Vlerësim i ritmit");
    expect(draft.next.diagnosis).toBe("");
    expect(draft.next.icd).toBe("");
    expect(draft.next.therapy).toBe("");
    expect(draft.next.allergies).toBe("");
    expect(draft.next.exam).toBe("");
  });
  it("does not invent normal observations or unspecified medicines", () => {
    const d=proposeQuickDraft(emptyReferral(),template,"palpitacione");
    expect(d.next.vitals).toBe("");
    expect(d.next.diagnostics).toBe("");
    expect(d.next.therapy).toBe("");
    expect(d.next.allergies).toBe("");
    expect(d.next.diagnosis).toBe("");
  });
  it("preserves pre-existing clinical entries", () => {
    const r={...emptyReferral(),history:"Ecuria klinike është dokumentuar nga mjeku.",toService:"Mjekësi interne"};
    const d=proposeQuickDraft(r,template,"palpitacione; EKG: kryer");
    expect(d.next.history).toBe(r.history);
    expect(d.next.toService).toBe(r.toService);
    expect(d.skipped).toContain("history");
    expect(d.skipped).toContain("toService");
  });
  it("only copies diagnosis and allergies when explicitly labeled", () => {
    const d=proposeQuickDraft(emptyReferral(),template,
      "Ankesa: lodhje; Diagnoza: hipertension i konfirmuar nga mjeku; Alergji: penicilinë");
    expect(d.next.diagnosis).toBe("hipertension i konfirmuar nga mjeku");
    expect(d.next.allergies).toBe("penicilinë");
    expect(d.next.icd).toBe("");
  });
  it("does not produce a referral based on an empty note", () => {
    const d=proposeQuickDraft(emptyReferral(),template,"  ");
    expect(d.changes).toHaveLength(0);
  });
  it("searches Albanian keywords with or without accents", () => {
    expect(normalizeSearch("Gjakderdhje nga hunda")).toBe("gjakderdhje nga hunda");
    expect(normalizeSearch("Ënjtje, Çrregullim!")).toBe("enjtje crregullim");
  });
});
