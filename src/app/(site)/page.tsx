import { CountdownLanding, landingMetadata } from "@/components/sites/gtasixcountdown/CountdownLanding";

export const revalidate = 300;

export function generateMetadata() {
  return landingMetadata("en");
}

export default function Page() {
  return <CountdownLanding locale="en" />;
}
