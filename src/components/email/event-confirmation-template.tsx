import { formatTime } from '@/lib/formatters'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface EventConfirmationEmailTemplateProps {
  name: string
  email: string
  city: string
  numAttending: number
  organization?: string
  eventTitle: string
  eventDate: string
  eventTime: string
  location: string
}

export default function EventConfirmationEmailTemplate({
  name,
  email,
  city,
  numAttending,
  organization,
  eventTitle,
  eventDate,
  eventTime,
  location,
}: EventConfirmationEmailTemplateProps) {
  const formatGoogleCalendarDate = (date: string, time: string) => {
    const dateTime = new Date(`${date}T${time}`)
    const endDateTime = new Date(dateTime.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '')
    return `${formatDate(dateTime)}/${formatDate(endDateTime)}`
  }

  return (
    <Html>
      <Head />
      <Preview>Your registration for {eventTitle} is confirmed! 🎉</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
            <Section>
              <Link href="https://marianco.org">
                <Img
                  src="https://marianco-images.s3.eu-north-1.amazonaws.com/logo_1b2f9e3772.png"
                  width={250}
                  height={74}
                  alt="Marianco logo"
                  className="mx-auto mb-4"
                />
              </Link>
            </Section>
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-gray-900 mb-2">
                Registration Confirmed!
              </Heading>
              <Text className="text-gray-600">
                Thank you for registering for our event
              </Text>
            </Section>
            <Section className="bg-blue-50 p-6 rounded-lg mb-8">
              <Heading className="text-xl font-semibold text-blue-900 mb-4">
                {eventTitle}
              </Heading>
              <Text className="text-blue-800 mb-2">
                <strong>Date:</strong> {eventDate}
              </Text>
              <Text className="text-blue-800 mb-2">
                <strong>Time:</strong> {formatTime(eventTime)}
              </Text>
              <Text className="text-blue-800">
                <strong>Location:</strong> {location}
              </Text>
            </Section>

            <Section className="mb-8">
              <Heading className="text-xl font-semibold text-gray-900 mb-4">
                Your Details
              </Heading>
              <div className="space-y-3">
                <Text className="text-gray-700">
                  <span className="font-medium">Name:</span> {name}
                </Text>
                <Text className="text-gray-700">
                  <span className="font-medium">Email:</span> {email}
                </Text>
                <Text className="text-gray-700">
                  <span className="font-medium">Location:</span> {city}
                </Text>
                <Text className="text-gray-700">
                  <span className="font-medium">Number of Attendees:</span>{' '}
                  {numAttending}
                </Text>
                {organization && (
                  <Text className="text-gray-700">
                    <span className="font-medium">Organization:</span>{' '}
                    {organization}
                  </Text>
                )}
              </div>
            </Section>

            <Section className="mb-8 text-center">
              <Link
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatGoogleCalendarDate(eventDate, eventTime)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(`You have registered for ${eventTitle}. We look forward to seeing you!\n\nLocation: ${location}\nNumber of Attendees: ${numAttending}`)}`}
                className="bg-blue-600 text-white px-4 py-3 rounded-md font-medium inline-block no-underline"
              >
                Add to Google Calendar
              </Link>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Section className="text-center text-gray-600 text-sm">
              <Text>Need to make changes?</Text>
              <Link
                href={`mailto:support@marianco.com?subject=Event Registration - ${eventTitle}`}
                className="text-blue-600 underline"
              >
                Contact Support
              </Link>
            </Section>

            <Section className="text-center text-xs text-gray-500 mt-8">
              <Text>
                {' '}
                {new Date().getFullYear()} Marianco. All rights reserved.
              </Text>
              <Text>
                This is an automated message. Please do not reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
