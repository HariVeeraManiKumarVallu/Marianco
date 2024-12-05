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

export async function POST(
  req: Request,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const [body, { documentId }] = await Promise.all([
      req.json(),
      context.params,
    ])

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

    const eventRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events/${documentId}`,
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

    const event = eventData.data

    const { error: confirmationError } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: `Registration Confirmed: ${event.title}`,
      react: EventConfirmationEmailTemplate({
        name,
        email,
        city,
        numAttending,
        organization,
        eventTitle: event.title,
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
      subject: `New Registration: ${event.title}`,
      react: EventSignupEmailTemplate({
        name,
        email,
        city,
        numAttending,
        organization,
        eventId: event.id,
        eventTitle: event.title,
      }),
    })

    if (notificationError) {
      console.error('Notification email error:', notificationError)
    }

    const attendeeRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/event-attendees`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name,
            email,
            city,
            participants: numAttending,
            organization,
            event: { connect: [event.documentId] },
          },
        }),
      }
    )

    if (!attendeeRes.ok) {
      console.error('Failed to create attendee', attendeeRes)
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
