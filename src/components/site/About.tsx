import { motion } from "framer-motion";
import owner from "@/assets/owner.jpg";

export function About() {
  return (
    <section id="over" className="py-24 bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gold/10 blur-2xl rounded-full" />
          <img
            src={owner}
            alt="Eigenaar van IDM Motors"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative rounded-2xl object-cover w-full max-w-md shadow-elegant"
          />
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">Over IDM Motors</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">De mens achter het bedrijf.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            IDM Motors is een persoonlijk autobedrijf met passie voor wagens en respect
            voor de klant. Ik koop en verkoop dagelijks voertuigen van particulieren en
            bedrijven, en zorg voor een vlotte, transparante afhandeling van A tot Z.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Of u nu uw huidige wagen wil verkopen of op zoek bent naar een nieuwe — bij
            IDM Motors krijgt u eerlijk advies, een correcte prijs en een snelle service.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="text-3xl font-bold text-gold">4+</div>
              <div className="text-xs text-muted-foreground mt-1">Jaar ervaring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">250+</div>
              <div className="text-xs text-muted-foreground mt-1">Tevreden klanten</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">24u</div>
              <div className="text-xs text-muted-foreground mt-1">Reactietijd</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
