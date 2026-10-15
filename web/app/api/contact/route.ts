import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { links } from "@/content/links";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid_input" }, { status: 400 });
  }

  const { email, name, message, company, locale } = parsed.data;
  // Bots fill the honeypot; pretend success so they don't retry.
  if (company) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Kaan Şengün <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? links.email,
    replyTo: email,
    subject: `Yeni proje mesajı: ${name}`,
    text: `Ad: ${name}\nE-posta: ${email}\nDil: ${locale ?? "-"}\n\n${message}`,
    html: `<p><strong>Ad:</strong> ${escape(name)}<br/><strong>E-posta:</strong> ${escape(email)}<br/><strong>Dil:</strong> ${escape(locale ?? "-")}</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
