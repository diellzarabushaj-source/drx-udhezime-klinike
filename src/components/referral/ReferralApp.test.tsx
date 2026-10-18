import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ReferralApp } from "./ReferralApp";

class TestResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", TestResizeObserver);
  HTMLElement.prototype.scrollIntoView = vi.fn();
  window.confirm = vi.fn(() => true);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("DRX clinical referral workflow", () => {
  it("selects a real prepared template, lets clinician approve it, and exposes the edit wizard", () => {
    render(<ReferralApp />);
    const search = screen.getByPlaceholderText(/palpitacione, diabet, dhimbje barku/i);
    fireEvent.change(search, { target: { value: "palpitacione" } });
    const selection = screen.getByRole("button", { name: /^Palpitacione\s+Kardiologji$/i });
    fireEvent.click(selection);
    fireEvent.click(screen.getByRole("button", { name: /Mbush formularin me shabllon/i }));
    expect(screen.getByText("Parapamja para pranimit")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Prano dhe hape për plotësim/i }));
    const reason = screen.getByLabelText(/Arsyeja e udhëzimit/i) as HTMLTextAreaElement;
    expect(reason.value).toMatch(/\[konfirmo: palpitacione\]/i);
    expect(screen.getByText(/mbeten/i)).toBeInTheDocument();
    const answer = screen.getByRole("textbox", { name: /^Plotëso:/i });
    fireEvent.change(answer, { target: { value: "Palpitacione të raportuara prej 3 ditësh" } });
    fireEvent.click(screen.getByRole("button", { name: /Vendose dhe vazhdo/i }));
    expect(reason.value).toContain("Palpitacione të raportuara prej 3 ditësh");
  });

  it("merges shorthand vital values into a prepared document without hallucinating a diagnosis", () => {
    render(<ReferralApp />);
    fireEvent.change(screen.getByPlaceholderText(/palpitacione, diabet, dhimbje barku/i), {target:{value:"palpitacione"}});
    fireEvent.click(screen.getByRole("button", {name:/^Palpitacione\s+Kardiologji$/i}));
    fireEvent.click(screen.getByRole("button", {name:/Mbush formularin me shabllon/i}));
    fireEvent.click(screen.getByRole("button", {name:/Prano dhe hape për plotësim/i}));
    fireEvent.change(screen.getByLabelText("Shënimi i mjekut"),{target:{value:"TA: 150/90; EKG: e kryer"}});
    fireEvent.click(screen.getByRole("button",{name:/Përgatit draftin/i}));
    expect(screen.getByText("Parapamja e plotësimit")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:/Prano draftin/i}));
    expect((screen.getByLabelText(/Shenjat vitale \(opsionale\)/i) as HTMLTextAreaElement).value).toContain("TA: 150/90");
    expect((screen.getByLabelText("Ekzaminimet diagnostike") as HTMLTextAreaElement).value).toContain("EKG: e kryer");
    expect((screen.getByLabelText(/Diagnoza e punës/i) as HTMLTextAreaElement).value).toBe("");
  });

  it("warns before printing an unfinished referral", () => {
    render(<ReferralApp />);
    fireEvent.click(screen.getByRole("button",{name:/Printo \/ PDF/i}));
    expect(window.confirm).toHaveBeenCalled();
  });
});
