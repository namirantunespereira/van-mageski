
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, message } = body || {};

    const to = process.env.CONTACT_TO;
    if (!to) return NextResponse.json({ error: "CONTACT_TO faltando" }, { status: 500 });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <no-reply@van-mageski.com>",
        to: [to],
        subject: `Novo contato de ${name}`,
        replyTo: email,
        text: `Nome: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nMensagem:\n${message}`
      });
    } else if (process.env.SMTP_HOST) {
      // fallback SMTP opcional – você pode implementar com nodemailer se preferir
      return NextResponse.json({ error: "SMTP não implementado neste template" }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Nenhum provedor de e-mail configurado" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Falha no envio" }, { status: 500 });
  }
}


