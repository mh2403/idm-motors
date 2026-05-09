import { motion } from "framer-motion";
import { Car, Clock, BadgeEuro, PhoneCall, FileCheck2, MapPin } from "lucide-react";

const items = [
  { icon: MapPin, title: "Gratis bezoek aan uw wagen", desc: "Wij komen tot bij u — overal in België, zonder kosten." },
  { icon: Clock, title: "Snelle afhandeling", desc: "Antwoord binnen 24u, directe ophaling mogelijk." },
  { icon: BadgeEuro, title: "Eerlijke prijs", desc: "Marktconforme schatting door ervaren experts." },
  { icon: PhoneCall, title: "Direct contact", desc: "Bereikbaar via telefoon, WhatsApp en e-mail." },
  { icon: FileCheck2, title: "Vrijblijvende offerte", desc: "U beslist of u akkoord gaat — geen verplichtingen." },
  { icon: Car, title: "Alle merken & modellen", desc: "Van dagelijkse wagens tot premium en oldtimers." },
];

export function Benefits() {
  return (
    <section id="voordelen" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gold">Waarom IDM Motors</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Een aanpak gebouwd op vertrouwen.</h2>
          <p className="mt-4 text-muted-foreground">
            Wij maken de verkoop van uw wagen zo eenvoudig mogelijk. Transparant, snel en altijd zonder druk.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-gold/40 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-accent-foreground transition">
                <it.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
