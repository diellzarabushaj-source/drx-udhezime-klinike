import { describe, expect, it } from "vitest";
import { checkEssentials, emptyReferral, TEMPLATES } from "./referral";
import { findTemplateSlots, isTemplateIncomplete, prepareCompleteTemplate, replaceTemplateSlot } from "./ready-template";

const r = () => emptyReferral("2026-10-18");

describe("Udhëzimet e gatshme për secilën temë", () => {
  it("every nonempty clinical template prepares editable anamnesis, reason, examination, testing, treatment and consultation question", () => {
    expect(TEMPLATES.length).toBeGreaterThan(140);
    for (const t of TEMPLATES.filter((x) => x.id !== "bosh")) {
      const draft = prepareCompleteTemplate(r(), t);
      const fields = new Set(draft.changes.map((x) => x.field));
      for (const key of ["reason","history","allergies","exam","vitals","diagnostics","therapy","question","toService"]) {
        expect(fields.has(key as never), t.id + " is missing " + key).toBe(true);
      }
      expect(draft.next.reason.length).toBeGreaterThan(25);
      expect(draft.next.history.length).toBeGreaterThan(100);
      expect(draft.next.question.length).toBeGreaterThan(20);
      expect(draft.next.diagnosis, t.id + ": diagnosis must not be inferred").toBe("");
      expect(draft.next.icd, t.id + ": ICD must not be inferred").toBe("");
      expect(draft.next.patientName, t.id + ": patient must not be invented").toBe("");
      expect(draft.pending).toBeGreaterThan(5);
      expect(isTemplateIncomplete(draft.next.history)).toBe(true);
    }
  });

  it("preserves existing patient-specific observations instead of overwriting them", () => {
    const t = TEMPLATES.find((x) => x.id === "palpitacione")!;
    const original = {...r(), history:"Dhimbja u dokumentua nga mjeku.", vitals:"TA 130/80 mmHg", toService:"Njësia e Kardiologjisë"};
    const draft = prepareCompleteTemplate(original, t);
    expect(draft.next.history).toBe(original.history);
    expect(draft.next.vitals).toBe(original.vitals);
    expect(draft.next.toService).toBe(original.toService);
    expect(draft.preserved).toContain("history");
    expect(draft.preserved).toContain("vitals");
  });

  it("does not mistake placeholders for completed clinical sections", () => {
    const t = TEMPLATES.find((x) => x.id === "palpitacione")!;
    const draft = prepareCompleteTemplate(r(), t);
    const essentials = checkEssentials(draft.next);
    expect(essentials.find((x) => x.key === "reason")?.done).toBe(false);
    expect(essentials.find((x) => x.key === "history")?.done).toBe(false);
    expect(essentials.find((x) => x.key === "allergies")?.done).toBe(false);
    expect(essentials.find((x) => x.key === "diagnosis")?.done).toBe(false);
    expect(essentials.find((x) => x.key === "toService")?.done).toBe(true);
  });

  it("fills one explicitly selected marker and moves on to the next without changing other facts", () => {
    const t = TEMPLATES.find((x) => x.id === "palpitacione")!;
    const initial = prepareCompleteTemplate(r(), t).next;
    const all = findTemplateSlots(initial);
    expect(all.length).toBeGreaterThan(8);
    const one = all.find((slot) => slot.field === "history")!;
    const updated = replaceTemplateSlot(initial, one, "Palpitacione të raportuara nga pacienti");
    expect(updated.history).toContain("Palpitacione të raportuara nga pacienti");
    expect(updated.history).not.toContain(one.marker);
    expect(updated.exam).toBe(initial.exam);
    expect(updated.diagnosis).toBe("");
    expect(findTemplateSlots(updated).length).toBe(all.length-1);
  });

  it("never inserts a blank or unverified placeholder as an answer", () => {
    const t = TEMPLATES.find((x) => x.id === "palpitacione")!;
    const initial = prepareCompleteTemplate(r(), t).next;
    const one = findTemplateSlots(initial)[0]!;
    expect(replaceTemplateSlot(initial, one, " ")).toBe(initial);
    expect(replaceTemplateSlot(initial, one, "[plotëso: ndryshe]")).toBe(initial);
    expect(isTemplateIncomplete("Statusi: [plotëso: anamneza]")).toBe(true);
    expect(isTemplateIncomplete("Statusi: i raportuar nga mjeku")).toBe(false);
  });

  it("does nothing for the blank template", () => {
    expect(prepareCompleteTemplate(r(), TEMPLATES.find((x) => x.id === "bosh")!).changes).toHaveLength(0);
  });
});
