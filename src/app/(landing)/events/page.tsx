import NewsletterSignup from '@/components/forms/newsletter-signup'
import TitleSection from '@/components/title-section'
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

export default function EventsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <TitleSection
        title="Our Events"
        description="Join us at our upcoming events to learn more about our mission and how you can help make a difference."
        image={{
          url: 'https://marianco-images.s3.eu-north-1.amazonaws.com/title_img_e08366ee51.jpg',
          altText: 'Hands reaching out',
        }}
      />
      <EventsSection />
      {/* <PastEventsSection pastEvents={pastEvents} /> */}

      <NewsletterSignup />
    </div>
  )
}
