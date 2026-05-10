import { FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";

type OfferRow = {
  id: number;
  created_at: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  asking_price: string | null;
  notes: string | null;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string;
  status: "new" | "contacted" | "closed";
  owner_note: string | null;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "IDM Motors Admin" }],
  }),
});

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [offers, setOffers] = useState<OfferRow[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const formattedCount = useMemo(() => offers.length, [offers.length]);

  useEffect(() => {
    if (!supabase) return;
    void refresh();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function refresh() {
    if (!supabase) return;
    setChecking(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const currentEmail = sessionData.session?.user.email ?? null;
    setSessionEmail(currentEmail);
    if (!sessionData.session) {
      setIsAdmin(false);
      setOffers([]);
      setChecking(false);
      return;
    }

    const { data: adminData, error: adminError } = await supabase.rpc("is_admin");
    if (adminError || !adminData) {
      setIsAdmin(false);
      setOffers([]);
      setChecking(false);
      return;
    }

    setIsAdmin(true);
    const { data, error } = await supabase
      .from("offers")
      .select(
        "id, created_at, brand, model, year, mileage, fuel, transmission, asking_price, notes, contact_name, contact_email, contact_phone, status, owner_note",
      )
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Kon aanvragen niet laden.");
      setOffers([]);
      setChecking(false);
      return;
    }
    setOffers((data ?? []) as OfferRow[]);
    setChecking(false);
  }

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Inloggen mislukt.");
      return;
    }
    toast.success("Ingelogd.");
    setPassword("");
    await refresh();
  }

  async function onLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAdmin(false);
    setOffers([]);
    toast.success("Uitgelogd.");
  }

  async function saveOffer(offer: OfferRow) {
    if (!supabase) return;
    setSavingId(offer.id);
    const { error } = await supabase
      .from("offers")
      .update({ status: offer.status, owner_note: offer.owner_note ?? null })
      .eq("id", offer.id);
    setSavingId(null);
    if (error) {
      toast.error("Opslaan mislukt.");
      return;
    }
    toast.success("Opgeslagen.");
  }

  if (!hasSupabaseEnv || !supabase) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="mt-4 text-muted-foreground">
          Supabase is nog niet geconfigureerd. Voeg `VITE_SUPABASE_URL` en `VITE_SUPABASE_ANON_KEY` toe.
        </p>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-muted-foreground">Controleren...</p>
      </div>
    );
  }

  if (!sessionEmail) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-bold">Admin login</h1>
        <form onSubmit={onLogin} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm"
          />
          <button type="submit" className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-black">
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20">
        <h1 className="text-3xl font-bold">Geen toegang</h1>
        <p className="mt-4 text-muted-foreground">
          Dit account staat niet als admin in de database.
        </p>
        <button onClick={onLogout} className="mt-6 rounded-full border border-border px-5 py-2 text-sm">
          Uitloggen
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Aanvragen</h1>
          <p className="text-sm text-muted-foreground">
            Ingelogd als {sessionEmail} • {formattedCount} records
          </p>
        </div>
        <button onClick={onLogout} className="rounded-full border border-border px-5 py-2 text-sm">
          Uitloggen
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {offers.map((offer) => (
          <article key={offer.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {offer.brand} {offer.model} ({offer.year})
                </h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(offer.created_at).toLocaleString("nl-BE")} • {offer.mileage} km •{" "}
                  {offer.fuel} • {offer.transmission}
                </p>
              </div>
              <div className="text-sm">
                <p>{offer.contact_name || "Naam niet ingevuld"}</p>
                <p>{offer.contact_email}</p>
                <p>{offer.contact_phone}</p>
              </div>
            </div>

            {offer.asking_price ? (
              <p className="mt-3 text-sm">
                Gewenste prijs: <span className="font-semibold">{offer.asking_price}</span>
              </p>
            ) : null}
            {offer.notes ? <p className="mt-3 text-sm text-muted-foreground">{offer.notes}</p> : null}

            <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr_140px]">
              <select
                value={offer.status}
                onChange={(e) =>
                  setOffers((prev) =>
                    prev.map((x) =>
                      x.id === offer.id ? { ...x, status: e.target.value as OfferRow["status"] } : x,
                    ),
                  )
                }
                className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
              >
                <option value="new">Nieuw</option>
                <option value="contacted">Gecontacteerd</option>
                <option value="closed">Afgerond</option>
              </select>
              <input
                value={offer.owner_note ?? ""}
                onChange={(e) =>
                  setOffers((prev) =>
                    prev.map((x) => (x.id === offer.id ? { ...x, owner_note: e.target.value } : x)),
                  )
                }
                placeholder="Interne notitie"
                className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
              />
              <button
                onClick={() => saveOffer(offer)}
                disabled={savingId === offer.id}
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
              >
                {savingId === offer.id ? "Opslaan..." : "Opslaan"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
