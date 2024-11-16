import { EmailTemplate } from '@/components/email-template'
import { contactFormSchema } from '@/lib/schemas/form-schemas'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

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
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['francisco.padilla@gaddr.com'],
      subject: `New Contact: ${subject}`,
      react: EmailTemplate({ name, email, subject, message }),
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Email sent successfully',
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
