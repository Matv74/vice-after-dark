import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { DEFAULT_LEGAL_LOCALE } from "@/config/legal";
import { SITE_TITLE } from "@/components/sites/vice-signal/config";

export const metadata: Metadata = {
  title: SITE_TITLE,
  openGraph: {
    title: SITE_TITLE,
  },
  twitter: {
    title: SITE_TITLE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LEGAL_LOCALE} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <LegalFooter />
      </body>
    </html>
  );
}
