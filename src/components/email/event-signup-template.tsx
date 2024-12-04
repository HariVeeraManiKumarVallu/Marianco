import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface EventSignupEmailTemplateProps {
  name: string
  email: string
  city: string
  numAttending: number
  organization?: string
  eventId: string
  eventTitle: string
}

export default function EventSignupEmailTemplate({
  name,
  email,
  city,
  numAttending,
  organization,
  eventId,
  eventTitle,
}: EventSignupEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New registration for {eventTitle} from {name}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
            <Section>
              <Link href="https://marianco.org">
                <Img
                  src="https://marianco-images.s3.eu-north-1.amazonaws.com/logo_1b2f9e3772.png"
                  width={250}
                  height={100}
                  alt="Marianco logo"
                  className="mx-auto mb-4"
                />
              </Link>
            </Section>

            <Section className="mb-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-2">
                New Event Registration
              </Heading>
              <Text className="text-gray-600">
                A new participant has registered for an event
              </Text>
            </Section>

            <Section className="bg-blue-50 p-6 rounded-lg mb-8">
              <Heading className="text-xl font-semibold text-blue-900 mb-4">
                Event Details
              </Heading>
              <div className="space-y-2">
                <Text className="text-blue-800">
                  <span className="font-medium">Event:</span> {eventTitle}
                </Text>
                <Text className="text-blue-800">
                  <span className="font-medium">Event ID:</span> {eventId}
                </Text>
              </div>
            </Section>

            <Section className="mb-8">
              <Heading className="text-xl font-semibold text-gray-900 mb-4">
                Participant Information
              </Heading>
              <div className="space-y-3">
                <Text className="text-gray-700">
                  <span className="font-medium">Name:</span> {name}
                </Text>
                <Text className="text-gray-700">
                  <span className="font-medium">Email:</span>{' '}
                  <Link href={`mailto:${email}`} className="text-blue-600">
                    {email}
                  </Link>
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
            {/* 
            <Section className="text-center">
              <Link
                href={`https://marianco.org/admin/events/${eventId}`}
                className="bg-blue-600 text-white px-4 py-3 rounded-md font-medium inline-block no-underline"
              >
                View in Dashboard
              </Link>
            </Section> */}

            <Section className="text-center text-xs text-gray-500 mt-8">
              <Text> 2023 Marianco. All rights reserved.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
