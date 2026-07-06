import { Capabilities } from "@/components/Capabilities";
import { Differentiation } from "@/components/Differentiation";
import { Hero } from "@/components/Hero";
import { InvestorNetwork } from "@/components/InvestorNetwork";

export default function Home() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <Differentiation />
      <InvestorNetwork />
    </main>
  );
}
