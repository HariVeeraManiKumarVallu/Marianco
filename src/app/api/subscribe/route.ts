import { newsletterSignupSchema } from '@/lib/validators/form-schema'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const { email } = await newsletterSignupSchema.parseAsync(await req.json())

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
    const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_API_SERVER) {
      throw new Error('Missing Mailchimp configuration')
    }

    const data = {
      email_address: email,
      status: 'pending',
    }

    const response = await fetch(
      `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    const responseData = await response.json()
    Response.json(responseData)

    if (!response.ok) {
      throw new Error(responseData.detail || 'Failed to subscribe')
    }

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
