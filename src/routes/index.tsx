import { createFileRoute } from "@tanstack/react-router";
import { ReferralApp } from "@/components/referral/ReferralApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRX Udhëzime — Udhëzim për konsultim" },
      { name: "description", content: "Hartoni udhëzime profesionale për konsultim specialistik me pamje A4 të drejtpërdrejtë dhe printim." },
      { property: "og:title", content: "DRX Udhëzime — Udhëzim për konsultim" },
      { property: "og:description", content: "Mjet për mjekët për të hartuar udhëzime për konsultim specialistik, pa ruajtje të dhënash." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReferralApp,
});