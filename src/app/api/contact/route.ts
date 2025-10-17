import { EmailTemplate } from '@/components/email/contact-form-template'
import { contactFormSchema } from '@/lib/schemas/form-schemas'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const missing = ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_TO'].filter((k) => !process.env[k as keyof NodeJS.ProcessEnv])
  if (missing.length) {
    return NextResponse.json({ error: `Email service unavailable (missing: ${missing.join(', ')})` }, { status: 503 })
  }
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY as string)

  const body = await req.json().catch(() => ({} as any))
  const result = contactFormSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        errors: result.error.errors,
      },
      { status: 400 }
    )
  }

  const { name, email, subject, message } = result.data

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: process.env.EMAIL_TO as string,
    subject: 'New contact message',
    html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
  })

  if (error) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
