import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { offerSchema } from "@/lib/offer-schema";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const inputCls =
  "w-full bg-input/60 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition placeholder:text-muted-foreground/60";

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function SubmitCarForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if ((form.get("website") as string)?.length) {
      toast.error("Verzenden mislukt. Probeer opnieuw.");
      return;
    }
    const data = Object.fromEntries(form.entries());
    const parsed = offerSchema.safeParse(data);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const field = String(firstIssue.path[0] ?? "");
      const fieldLabel: Record<string, string> = {
        brand: "Merk",
        model: "Model",
        year: "Bouwjaar",
        mileage: "Kilometerstand",
        fuel: "Brandstof",
        transmission: "Versnellingsbak",
        price: "Gewenste prijs",
        name: "Naam",
        email: "E-mail",
        phone: "Telefoon",
        notes: "Beschrijving / opmerkingen",
      };
      const label = fieldLabel[field] ? `${fieldLabel[field]}: ` : "";
      toast.error(`${label}${firstIssue.message}`);
      return;
    }
    if (!hasSupabaseEnv || !supabase) {
      toast.error("Formulier is nog niet geconfigureerd.");
      return;
    }
    setSubmitting(true);

    const uploadedPhotoPaths: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `offers/${crypto.randomUUID()}.${extension}-${sanitizeFilename(file.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("offer-photos")
          .upload(path, file, { upsert: false });

        if (uploadError) {
          if (uploadedPhotoPaths.length > 0) {
            await supabase.storage.from("offer-photos").remove(uploadedPhotoPaths);
          }
          setSubmitting(false);
          toast.error("Upload van foto's mislukt. Probeer opnieuw.");
          return;
        }

        uploadedPhotoPaths.push(path);
      }
    }

    const payload = {
      brand: parsed.data.brand,
      model: parsed.data.model,
      year: Number(parsed.data.year),
      mileage: Number(parsed.data.mileage),
      fuel: parsed.data.fuel,
      transmission: parsed.data.transmission,
      asking_price: parsed.data.price || null,
      notes: parsed.data.notes || null,
      contact_name: parsed.data.name || null,
      contact_email: parsed.data.email,
      contact_phone: parsed.data.phone,
      photos: uploadedPhotoPaths,
    };

    const { error } = await supabase.from("offers").insert(payload);
    if (error) {
      if (uploadedPhotoPaths.length > 0) {
        await supabase.storage.from("offer-photos").remove(uploadedPhotoPaths);
      }
      setSubmitting(false);
      toast.error("Aanvraag kon niet verzonden worden. Probeer opnieuw.");
      return;
    }

    await supabase.functions.invoke("notify-offer", {
      body: payload,
    });

    const whatsAppMessage = [
      "Beste IDM Motors,",
      "ik heb zonet een aanvraag verstuurd via het formulier op jullie website.",
      `Wagen: ${parsed.data.brand} ${parsed.data.model} (${parsed.data.year})`,
      `Naam: ${parsed.data.name || "Niet ingevuld"}`,
      `E-mail: ${parsed.data.email}`,
      `Telefoon: ${parsed.data.phone}`,
    ].join("\n");
    setWhatsAppUrl(`https://wa.me/32495159162?text=${encodeURIComponent(whatsAppMessage)}`);

    setSubmitting(false);
    setDone(true);
    setShowWhatsAppPrompt(true);
    toast.success("Aanvraag verzonden! We nemen binnen 24u contact op.");
    (e.target as HTMLFormElement).reset();
    setFiles([]);
  }

  if (done) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 rounded-2xl bg-card border border-gold/30 text-center"
        >
          <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
          <h3 className="mt-4 text-2xl font-bold">Bedankt voor uw aanvraag</h3>
          <p className="mt-2 text-muted-foreground">
            We bekijken uw wagen en nemen binnen 24u persoonlijk contact met u op.
          </p>
          <button
            onClick={() => setDone(false)}
            className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full border border-border hover:bg-muted transition text-sm"
          >
            Nieuwe aanvraag indienen
          </button>
        </motion.div>

        <AlertDialog open={showWhatsAppPrompt} onOpenChange={setShowWhatsAppPrompt}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Laat de eigenaar weten dat je een formulier verstuurd hebt
              </AlertDialogTitle>
              <AlertDialogDescription>
                Klik op WhatsApp om direct een bericht te sturen naar IDM Motors.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Later</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (whatsAppUrl) {
                    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className="bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                Stuur via WhatsApp
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-elegant space-y-5"
    >
      <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Merk *">
          <input name="brand" required className={inputCls} placeholder="bv. BMW" />
        </Field>
        <Field label="Model *">
          <input name="model" required className={inputCls} placeholder="bv. 320d" />
        </Field>
        <Field label="Bouwjaar *">
          <input name="year" required inputMode="numeric" className={inputCls} placeholder="2018" />
        </Field>
        <Field label="Kilometerstand *">
          <input
            name="mileage"
            required
            inputMode="numeric"
            className={inputCls}
            placeholder="125000"
          />
        </Field>
        <Field label="Brandstof *">
          <select name="fuel" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Kies brandstof
            </option>
            <option>Benzine</option>
            <option>Diesel</option>
            <option>Hybride</option>
            <option>Elektrisch</option>
            <option>LPG</option>
          </select>
        </Field>
        <Field label="Versnellingsbak *">
          <select name="transmission" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Kies type
            </option>
            <option>Manueel</option>
            <option>Automatisch</option>
          </select>
        </Field>
        <Field label="Gewenste prijs (€)">
          <input name="price" className={inputCls} placeholder="optioneel" />
        </Field>
        <Field label="Naam">
          <input name="name" className={inputCls} placeholder="Voor- en achternaam" />
        </Field>
        <Field label="E-mail *">
          <input
            name="email"
            type="email"
            required
            className={inputCls}
            placeholder="naam@voorbeeld.be"
          />
        </Field>
        <Field label="Telefoon *">
          <input name="phone" type="tel" required className={inputCls} placeholder="+32 ..." />
        </Field>
      </div>

      <Field label="Beschrijving / opmerkingen">
        <textarea
          name="notes"
          rows={4}
          className={inputCls}
          placeholder="Staat van de wagen, opties, schade, ..."
        />
      </Field>

      <Field label="Foto's van de wagen">
        <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border hover:border-gold/50 cursor-pointer transition">
          <Upload className="w-4 h-4 text-gold" />
          <span className="text-sm text-muted-foreground">
            {files.length
              ? `${files.length} foto('s) geselecteerd`
              : "Klik om foto's toe te voegen (optioneel)"}
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </label>
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gold text-accent-foreground font-semibold shadow-glow hover:scale-[1.01] disabled:opacity-60 transition"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Verzenden...
          </>
        ) : (
          "Verstuur aanvraag"
        )}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Door te verzenden stemt u in met persoonlijke contactopname. Geen verplichtingen.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
