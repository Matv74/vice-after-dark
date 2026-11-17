import "./globals.css";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { DEFAULT_LEGAL_LOCALE } from "@/config/legal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LEGAL_LOCALE} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <LegalFooter />
      </body>
    </html>
  );
}
