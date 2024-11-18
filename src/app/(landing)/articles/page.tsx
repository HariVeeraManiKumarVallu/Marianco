import { Metadata } from 'next'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { SOCIAL_LINKS } from '@/config/social-links'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Stay informed with the latest news, insights, and stories from Marianco. Read about our impact, child protection initiatives, and ways to make a difference.',
  openGraph: {
    title: 'Articles | Marianco',
    description:
      'Stay informed with the latest news, insights, and stories from Marianco. Read about our impact, child protection initiatives, and ways to make a difference.',
  },
}

export default function Page() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="container flex-1 flex flex-col items-center justify-center gap-4 ">
        <p className="text-center mt-48">
          No articles yet. Subscribe to our newsletter or follow us on social
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
