import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SubmitSection } from "@/components/site/SubmitSection";
import { Benefits } from "@/components/site/Benefits";
import { About } from "@/components/site/About";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IDM Motors — Wij kopen en verkopen wagens" },
      {
        name: "description",
        content:
          "IDM Motors koopt en verkoopt wagens snel, correct en vrijblijvend. Gratis expertise en gratis bezoek aan uw wagen — antwoord binnen 24 uur.",
      },
      { property: "og:title", content: "IDM Motors — Premium aankoop & verkoop van wagens" },
      { property: "og:description", content: "Gratis expertise, eerlijke prijs, snelle afhandeling." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <SubmitSection />
        <Benefits />
        <About />
        <CTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
