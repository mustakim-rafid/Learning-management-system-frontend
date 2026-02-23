export const dynamic = "force-dynamic"; 

import Benefits from "@/components/modules/home/Benefits";
import CTA from "@/components/modules/home/CTA";
import Features from "@/components/modules/home/Features";
import Hero from "@/components/modules/home/Hero";

export default async function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <CTA />
    </>
  );
}
