import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "@/components/legal/SiteShell";
import { HOME_LANGUAGE, SITE_TITLE, SITE_URL } from "@/components/sites/vice-signal/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "96x96" },
  },
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
  return <SiteShell lang={HOME_LANGUAGE}>{children}</SiteShell>;
}
