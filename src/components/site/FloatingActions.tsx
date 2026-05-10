import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed right-4 z-40 flex flex-col gap-3 md:right-5" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
      <a
        href="https://wa.me/32495159162"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-105 md:h-14 md:w-14"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      </a>
      <a
        href="tel:+32495159162"
        aria-label="Bel ons"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-accent-foreground shadow-elegant transition hover:scale-105 md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  );
}
