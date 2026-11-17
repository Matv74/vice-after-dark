import { landingMetadata, LocalizedLanding } from "@/components/sites/gtasixcountdown/LocalizedLanding";

export const metadata = landingMetadata("pl");

export default function Page() {
  return <LocalizedLanding locale="pl" />;
}
