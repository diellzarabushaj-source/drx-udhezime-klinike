// The Lovable wrapper already wires TanStack Start, React, Tailwind and Nitro.
// On Vercel, use Nitro's Vercel preset instead of the wrapper's Cloudflare default.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: process.env.VERCEL ? { preset: "vercel" } : undefined,
});
