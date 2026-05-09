import { SubmitCarForm } from "./SubmitCarForm";

export function SubmitSection() {
  return (
    <section id="aanbieden" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-gold">Wagen aanbieden</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Ontvang een vrijblijvend prijsvoorstel.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Vul het formulier in en wij contacteren u binnen 24 uur met een eerlijke
            schatting. Indien gewenst komen we gratis bij u langs voor de expertise.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Gratis expertise ter plaatse", "Snelle, contante betaling", "Geen verplichtingen", "Directe ophaling mogelijk"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <SubmitCarForm />
        </div>
      </div>
    </section>
  );
}
