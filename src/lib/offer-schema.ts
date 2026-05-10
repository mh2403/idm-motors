import { z } from "zod";

export const offerSchema = z.object({
  brand: z.string().trim().min(1, "Merk is verplicht").max(50),
  model: z.string().trim().min(1, "Model is verplicht").max(50),
  year: z.string().regex(/^\d{4}$/, "Geldig bouwjaar (jjjj)"),
  mileage: z
    .string()
    .trim()
    .min(1, "Kilometerstand is verplicht")
    .refine((value) => /^\d[\d\s.,]*$/.test(value), "Gebruik enkel cijfers")
    .transform((value) => value.replace(/[^\d]/g, "")),
  fuel: z.string().min(1, "Kies brandstoftype"),
  transmission: z.string().min(1, "Kies versnellingsbak"),
  price: z.string().max(20).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Geldig e-mailadres vereist").max(255),
  phone: z.string().trim().min(6, "Telefoonnummer vereist").max(30),
});

export type OfferInput = z.infer<typeof offerSchema>;
