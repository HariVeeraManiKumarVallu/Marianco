'use client'
import { motion } from 'motion/react'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { EventInfo } from './page'

export default function PastEventsSection({
  pastEvents,
}: {
  pastEvents: EventInfo[]
}) {
  return (
    <section>
      <div className="container">
        <h2 className="mb-8">Past Events</h2>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pastEvents.map((event, index) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=" rounded-lg overflow-hidden shadow-sm"
            >
              <Link href={`/articles/${event.id}`} className="group">
                <div className="relative h-48">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                    {event.location}
                  </span>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="size-4 mr-2" />
                    {/* {format(new Date(event.date), 'MMMM d, yyyy')} */}
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
        {pastEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No upcoming events at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
