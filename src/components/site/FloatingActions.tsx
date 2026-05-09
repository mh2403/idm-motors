import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/32000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-105 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="tel:+32000000000"
        aria-label="Bel ons"
        className="w-14 h-14 rounded-full bg-gold text-accent-foreground flex items-center justify-center shadow-elegant hover:scale-105 transition"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
