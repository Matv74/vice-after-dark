import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { LegalFooter } from "./LegalFooter";

export function SiteShell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <LegalFooter />
      </body>
    </html>
  );
}
