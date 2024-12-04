import NewsletterSignup from '@/components/forms/newsletter-signup'
import TitleSection from '@/components/title-section'
import { SOCIAL_LINKS } from '@/config/social-links'
import { EventResponse } from '@/types/event'
import { Metadata } from 'next'
import EventsSection from './events-sections'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Join Marianco at our upcoming events. From fundraisers and awareness campaigns to community gatherings, discover opportunities to make a difference.',
  openGraph: {
    title: 'Events | Marianco',
    description:
      'Join Marianco at our upcoming events. From fundraisers and awareness campaigns to community gatherings, discover opportunities to make a difference.',
  },
}

export default async function Events() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  )

  const data: EventResponse = await res.json()

  return (
    <div className="flex-1 flex flex-col">
      <TitleSection
        title="Our Events"
        description="Join us at our upcoming events to learn more about our mission and how you can help make a difference."
        image={{
          url: '/titleImg.png',
          altText: 'altText',
        }}
      />
      {data.data.length === 0 ? (
        <div className="container flex-1 flex flex-col items-center justify-center gap-4 ">
          <p className="text-center mt-48">
            No events yet. Subscribe to our newsletter or follow us on social
            media to stay updated with the latest news.
          </p>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={social.label}
              >
                <social.icon className="size-5 fill-foreground hover:fill-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      ) : (
        <EventsSection events={data.data} />
      )}
      {/* <PastEventsSection pastEvents={pastEvents} /> */}

      <NewsletterSignup />
    </div>
  )
}
