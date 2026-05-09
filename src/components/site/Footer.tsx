import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-block w-2 h-6 bg-gold rounded-sm" />
            IDM<span className="text-muted-foreground font-light">Motors</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Premium aankoop &amp; verkoop van wagens. Gratis expertise, eerlijke prijs, snelle service.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="tel:+32000000000" className="flex items-center gap-3 hover:text-gold transition"><Phone className="w-4 h-4 text-gold" /> +32 (0)000 00 00 00</a></li>
            <li><a href="mailto:info@idmmotors.be" className="flex items-center gap-3 hover:text-gold transition"><Mail className="w-4 h-4 text-gold" /> info@idmmotors.be</a></li>
            <li className="flex items-center gap-3 text-muted-foreground"><MapPin className="w-4 h-4 text-gold" /> België — bezoek aan huis mogelijk</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Openingsuren</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between"><span>Ma — Vr</span><span>09:00 — 19:00</span></li>
            <li className="flex justify-between"><span>Zaterdag</span><span>10:00 — 17:00</span></li>
            <li className="flex justify-between"><span>Zondag</span><span>Op afspraak</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} IDM Motors. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
