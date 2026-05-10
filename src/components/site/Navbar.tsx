import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#top" },
  { label: "Wagen aanbieden", href: "#aanbieden" },
  { label: "Voordelen", href: "#voordelen" },
  { label: "Over ons", href: "#over" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
          <span className="inline-block w-2 h-6 bg-gold rounded-sm" />
          IDM<span className="text-muted-foreground font-light">Motors</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border hover:bg-accent transition-colors"
          >
            Login
          </Link>
          <a
            href="tel:+32495159162"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-foreground text-primary-foreground hover:opacity-90 transition"
          >
            <Phone className="w-4 h-4" /> Bel direct
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground py-1">
                {l.label}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-full border border-border hover:bg-accent transition-colors"
            >
              Login
            </Link>
            <a href="tel:+32495159162" className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-foreground text-primary-foreground">
              <Phone className="w-4 h-4" /> Bel direct
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
