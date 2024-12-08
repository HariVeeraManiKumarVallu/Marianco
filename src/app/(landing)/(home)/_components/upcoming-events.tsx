'use client'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { EventData } from '@/types/event'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function UpcomingEvents({ events }: { events: EventData[] }) {
  return (
    <section className="bg-beige">
      <div className="container py-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className=" mb-4">Upcoming Events</h3>
          <p className="text-lg text-muted-foreground max-w-prose">
            Join us in making a difference. Participate in our upcoming events
            and initiatives.
          </p>
        </motion.div>

        <div className="grid max-w-[400px] md:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 mx-auto">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`${ROUTES.EVENTS}/${event.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image.url}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(new Date(event.date))} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {event.summary}
                  </p>
                  <div className="pt-2 flex items-center text-primary font-medium">
                    View Event
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="grid lg:justify-center">
          <Link href={ROUTES.EVENTS} className={buttonVariants()}>
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
