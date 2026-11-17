import type { ReactNode } from "react";
import { SiteShell } from "@/components/legal/SiteShell";
import "../../globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell lang="pl">{children}</SiteShell>;
}
