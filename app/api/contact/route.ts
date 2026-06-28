import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";
import { rateLimit } from "@/lib/rate-limit";

function esc(s: string): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  // Rate-limit por IP (5 envíos por minuto)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Esperá un momento e intentá de nuevo." },
      { status: 429 }
    );
  }

  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: bot -> ok sin procesar
  if (data.company_website) return NextResponse.json({ ok: true });

  // Validación server-side
  const errors: string[] = [];
  if (!data.name?.trim()) errors.push("name");
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("email");
  if (!data.phone?.trim()) errors.push("phone");
  if (!data.message?.trim()) errors.push("message");
  if (!data.privacy) errors.push("privacy");
  if (errors.length) {
    return NextResponse.json({ error: "Faltan campos obligatorios.", fields: errors }, { status: 422 });
  }

  const settings = await getSettings();
  const to = settings.contactRecipientEmail;

  const html = `
    <h2>Nueva consulta desde el sitio</h2>
    <p><strong>Nombre:</strong> ${esc(data.name)}</p>
    <p><strong>Email:</strong> ${esc(data.email)}</p>
    <p><strong>Teléfono:</strong> ${esc(data.phone)}</p>
    <p><strong>Organización:</strong> ${esc(data.org) || "—"}</p>
    <p><strong>Tipo:</strong> ${esc(data["org-type"]) || "—"}</p>
    <p><strong>Servicio de interés:</strong> ${esc(data.service) || "—"}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${esc(data.message).replace(/\n/g, "<br>")}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin Resend configurado (dev): registrar y responder ok.
    console.log("📨 Consulta (Resend no configurado). Destino:", to, data);
    return NextResponse.json({ ok: true, note: "dev-no-email" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Villarroel & Asociados <onboarding@resend.dev>",
      to,
      replyTo: data.email,
      subject: `Nueva consulta web — ${data.name}`,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "No pudimos enviar tu consulta. Probá por WhatsApp." }, { status: 502 });
    }
  } catch (e) {
    console.error("Error enviando email:", e);
    return NextResponse.json({ error: "No pudimos enviar tu consulta. Probá por WhatsApp." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
