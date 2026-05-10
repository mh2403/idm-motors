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
    links: [{ rel: "canonical", href: "https://idm-motors.be/" }],
    meta: [
      { title: "IDM Motors — Wij kopen en verkopen wagens" },
      {
        name: "description",
        content:
          "IDM Motors koopt en verkoopt wagens snel, correct en vrijblijvend. Gratis expertise aan huis, eerlijke prijs en antwoord binnen 24 uur.",
      },
      { property: "og:site_name", content: "IDM Motors" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_BE" },
      { property: "og:url", content: "https://idm-motors.be/" },
      { property: "og:title", content: "IDM Motors — Wij kopen en verkopen wagens" },
      {
        property: "og:description",
        content:
          "Gratis expertise aan huis, eerlijke prijs en snelle afhandeling. Ontvang vrijblijvend een prijsvoorstel voor uw wagen.",
      },
      { property: "og:image", content: "https://idm-motors.be/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://idm-motors.be/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "IDM Motors - Wij kopen en verkopen wagens" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IDM Motors — Wij kopen en verkopen wagens" },
      {
        name: "twitter:description",
        content:
          "Gratis expertise aan huis, eerlijke prijs en snelle afhandeling. Ontvang vrijblijvend een prijsvoorstel voor uw wagen.",
      },
      { name: "twitter:image", content: "https://idm-motors.be/og-image.jpg" },
      { name: "theme-color", content: "#0b0d12" },
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
