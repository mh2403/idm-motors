const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type OfferPayload = {
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  asking_price?: string | null;
  notes?: string | null;
  contact_name?: string | null;
  contact_email?: string;
  contact_phone?: string;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function line(label: string, value: string | number | null | undefined) {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(String(value ?? "-"))}</p>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const toEmail = Deno.env.get("LEAD_TO_EMAIL");
  const fromEmail = Deno.env.get("LEAD_FROM_EMAIL") ?? "IDM Motors <onboarding@resend.dev>";
  if (!resendApiKey || !toEmail) {
    return new Response("Missing mail secrets", { status: 500, headers: corsHeaders });
  }

  const payload = (await req.json()) as OfferPayload;
  const subject = `Nieuwe wagenaanvraag: ${payload.brand ?? ""} ${payload.model ?? ""}`.trim();
  const html = [
    "<h2>Nieuwe IDM Motors aanvraag</h2>",
    line("Merk", payload.brand),
    line("Model", payload.model),
    line("Bouwjaar", payload.year),
    line("Kilometerstand", payload.mileage),
    line("Brandstof", payload.fuel),
    line("Versnellingsbak", payload.transmission),
    line("Gewenste prijs", payload.asking_price),
    line("Naam", payload.contact_name),
    line("E-mail", payload.contact_email),
    line("Telefoon", payload.contact_phone),
    line("Opmerking", payload.notes),
  ].join("");

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    const body = await resendRes.text();
    return new Response(body, { status: 502, headers: corsHeaders });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
