import { Metadata } from 'next'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { SOCIAL_LINKS } from '@/config/social-links'

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

export default function Events() {
  return (
    <div className="flex-1 flex flex-col">
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
        <NewsletterSignup />
      </div>
    </div>
  )
}
