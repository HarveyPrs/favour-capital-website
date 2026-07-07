import { Capabilities } from "@/components/Capabilities";
import { ClosingCta } from "@/components/ClosingCta";
import { Differentiation } from "@/components/Differentiation";
import { Hero } from "@/components/Hero";
import { InsightsTeaser } from "@/components/InsightsTeaser";
import { InvestorNetwork } from "@/components/InvestorNetwork";
import { RepresentativeDeals } from "@/components/RepresentativeDeals";

export default function Home() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <Differentiation />
      <InvestorNetwork />
      <RepresentativeDeals />
      <InsightsTeaser />
      <ClosingCta />
    </main>
  );
}
