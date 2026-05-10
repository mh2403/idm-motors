import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero grain pb-20 pt-28 md:pb-24 md:pt-32">
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Wij kopen en verkopen wagens{" "}
            <span className="text-gold">snel, correct</span> en vrijblijvend.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Gratis expertise en gratis bezoek aan uw wagen — overal in België.
            Eerlijke prijs binnen 24u, directe afhandeling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#aanbieden"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-accent-foreground font-semibold shadow-glow hover:scale-[1.02] transition"
            >
              Vraag prijsvoorstel aan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href="#voordelen"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card/60 hover:bg-card transition"
            >
              Onze voordelen
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground sm:gap-6">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> 100% vrijblijvend</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> Antwoord binnen 24u</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full" />
          <img
            src={heroCar}
            alt="Premium zwarte wagen tegen donkere achtergrond"
            width={1920}
            height={1280}
            className="relative rounded-2xl shadow-elegant w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
