import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const missing = ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_TO'].filter(
    (k) => !process.env[k as keyof NodeJS.ProcessEnv]
  );
  if (missing.length) {
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY as string);

  const body = await req.json().catch(() => ({} as any));
  const { name, email, phone, option, message } = body;

  const subject =
    option === 'volunteer'
      ? 'New Volunteer Application'
      : option === 'partner'
      ? 'New Partnership Inquiry'
      : option === 'donate'
      ? 'New Donation Interest'
      : 'New Advocacy Interest';

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: process.env.EMAIL_TO as string,
    subject,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Message:</b><br/>${message}</p>`,
  });

  if (error) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
