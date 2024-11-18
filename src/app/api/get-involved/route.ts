import { GetInvolvedEmail } from '@/components/get-involved-email'
import { getInvolvedFormSchema } from '@/lib/schemas/get-involved-schema'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
  throw new Error('Missing email configuration environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const subjectLines = {
  volunteer: 'New Volunteer Application',
  partner: 'New Partnership Inquiry',
  donate: 'New Donation Interest',
  advocate: 'New Advocacy Interest',
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = getInvolvedFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          errors: result.error.errors,
        },
        { status: 400 }
      )
    }

    const { name, email, phone, option, message } = result.data

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: subjectLines[option],
      react: GetInvolvedEmail({ name, email, phone, option, message }),
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        {
          error: 'Failed to send email',
          message: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Email sent successfully',
      data,
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
