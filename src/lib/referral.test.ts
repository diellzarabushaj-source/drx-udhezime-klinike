import { describe, it, expect } from "vitest";
import { cleanText, checkEssentials, emptyReferral, applyTemplate, TEMPLATES, formatDate } from "./referral";

describe("referral rules", () => {
  it("cleanText collapses extra blank lines and spaces", () => {
    expect(cleanText("  a   b \n\n\n\nc  ")).toBe("a b\n\nc");
  });
  it("age satisfies the date-of-birth requirement", () => {
    const r = { ...emptyReferral("2026-10-17"), patientAge: "45" };
    expect(checkEssentials(r).find((c) => c.key === "patientDob")?.done).toBe(true);
  });
  it("empty referral reports all items except date missing", () => {
    expect(checkEssentials(emptyReferral("2026-10-17")).filter((c) => !c.done).length).toBe(10);
  });
  it("templates never set a diagnosis or ICD code", () => {
    for (const t of TEMPLATES) {
      const r = applyTemplate(emptyReferral(), t);
      expect(r.diagnosis).toBe("");
      expect(r.icd).toBe("");
    }
  });
  it("formats dates as DD.MM.YYYY", () => {
    expect(formatDate("2026-10-17")).toBe("17.10.2026");
  });
});