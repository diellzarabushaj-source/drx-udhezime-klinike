import React from "react";
import { createRoot } from "react-dom/client";
import { ReferralApp } from "./components/referral/ReferralApp";
import "./styles.css";
import "./kosovo-form.css";

const el = document.getElementById("root");
if (!el) throw new Error("Mungon rrënja e aplikacionit.");
createRoot(el).render(<React.StrictMode><ReferralApp /></React.StrictMode>);
