import ctaBg from "@/assets/cta-bg.jpg";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <img src={ctaBg} alt="" loading="lazy" width={1920} height={800} className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Klaar om uw wagen te <span className="text-gold">verkopen</span>?
        </h2>
        <p className="mt-5 text-muted-foreground text-lg">
          Vraag vandaag nog uw vrijblijvend prijsvoorstel aan. Antwoord binnen 24 uur.
        </p>
        <a href="#aanbieden" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-accent-foreground font-semibold shadow-glow hover:scale-[1.02] transition">
          Vraag uw prijsvoorstel aan <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
