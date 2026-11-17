import { landingMetadata, LocalizedLanding } from "@/components/sites/gtasixcountdown/LocalizedLanding";

export const metadata = landingMetadata("uk");

export default function Page() {
  return <LocalizedLanding locale="uk" />;
}
