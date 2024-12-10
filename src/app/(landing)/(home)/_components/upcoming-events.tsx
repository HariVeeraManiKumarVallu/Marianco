'use client'
import { buttonVariants } from '@/components/ui/button'
import UpcomingEventCard from '@/components/ui/upcoming-event-card'
import { ROUTES } from '@/config/routes'
import { EventData } from '@/types/event'
import { motion } from 'motion/react'
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
            <UpcomingEventCard event={event} key={event.id} index={index} />
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
