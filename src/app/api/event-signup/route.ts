import EventConfirmationEmailTemplate from '@/components/email/event-confirmation-template'
import EventSignupEmailTemplate from '@/components/email/event-signup-template'
import { eventSignupSchema } from '@/lib/schemas/event-signup-schema'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
  throw new Error('Missing email configuration environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = eventSignupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: result.error.errors,
        },
        { status: 400 }
      )
    }

    const { name, email, city, numAttending, organization } = result.data
    const eventId = body.eventId

    if (!eventId) {
      return NextResponse.json(
        {
          error: 'Event ID is required',
        },
        { status: 400 }
      )
    }

    // Fetch event details from Strapi
    const eventRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[id][$eq]=${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )

    const eventData = await eventRes.json()

    if (!eventData.data || eventData.data.length === 0) {
      return NextResponse.json(
        {
          error: 'Event not found',
        },
        { status: 404 }
      )
    }

    const event = eventData.data[0]
    const eventTitle = event.title

    // Send confirmation email to attendee
    const { error: confirmationError } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: `Registration Confirmed: ${eventTitle}`,
      react: EventConfirmationEmailTemplate({
        name,
        email,
        city,
        numAttending,
        organization,
        eventTitle,
        eventDate: event.date,
        eventTime: event.time,
        location: event.location,
      }),
    })

    if (confirmationError) {
      console.error('Confirmation email error:', confirmationError)
    }

    const { error: notificationError } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `New Registration: ${eventTitle}`,
      react: EventSignupEmailTemplate({
        name,
        email,
        city,
        numAttending,
        organization,
        eventId,
        eventTitle,
      }),
    })

    if (notificationError) {
      console.error('Notification email error:', notificationError)
    }

    return NextResponse.json(
      {
        message: 'Registration successful',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to process registration',
      },
      { status: 500 }
    )
  }
}
