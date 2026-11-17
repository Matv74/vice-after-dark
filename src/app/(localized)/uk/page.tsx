import { CountdownLanding, landingMetadata } from "@/components/sites/gtasixcountdown/CountdownLanding";

export const revalidate = 300;

export function generateMetadata() {
  return landingMetadata("uk");
}

export default function Page() {
  return <CountdownLanding locale="uk" />;
}
