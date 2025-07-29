import { Separator } from '@/components/ui/separator'
import { SOCIAL_LINKS } from '@/constants/social-links'
import { getAllActiveEvents } from '@/lib/queries/strapi/event'
import EventCard from './event-card'

export default async function EventsSection() {
  const data = await getAllActiveEvents()

  return (
    <section className="flex-1 w-full my-section">
      <div className="container">
        <h2>Events</h2>
        <p className="text-muted-foreground">
          We host a variety of events aimed at raising awareness, building
          community, and generating support for our initiatives. Whether virtual
          or in person, these events are vital for engaging our supporters and
          spreading the message of Marianco.
        </p>
        <Separator className="mt-4 mb-16 bg-muted h-[2px]" />

        {data.length > 0 ? (
          <ul className="space-y-16 lg:space-y-20">
            {data.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </ul>
        ) : (
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
        )}
      </div>
    </section>
  )
}
