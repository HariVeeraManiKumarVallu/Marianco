'use client'

import { ROUTES } from '@/constants/routes'
import { formatDate, formatTime } from '@/lib/formatters'
import { EventData } from '@/types/event'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function UpcomingEventCard({
  event,
  index,
}: {
  event: EventData
  index: number
}) {
  return (
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
              {formatDate(new Date(event.date))} at {formatTime(event.time)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
          </div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">{event.summary}</p>
          <div className="pt-2 flex items-center text-primary font-medium">
            View Event
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
