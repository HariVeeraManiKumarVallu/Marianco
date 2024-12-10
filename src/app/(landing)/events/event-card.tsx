'use client'

import { EventActions } from '@/components/event-actions'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTime } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { EventData } from '@/types/event'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function EventCard({
  event,
  index,
}: {
  event: EventData
  index: number
}) {
  return (
    <motion.li
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          {
            'lg:flex-row-reverse ': index % 2 !== 0,
          },
          'lg:flex max-w-[500px] mx-auto lg:max-w-none shadow-xl border-none group'
        )}
      >
        <CardHeader className="relative rounded-lg overflow-hidden h-64 w-full lg:h-auto lg:flex-1 max-w-[704px] ">
          <Link href={`/events/${event.slug}`}>
            <Image
              src={event.image.formats?.large?.url ?? event.image.url ?? ''}
              alt={event.image.alternativeText || ''}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
            />
          </Link>
        </CardHeader>
        <CardContent className="py-8 lg:py-12 lg:min-w-[400px] lg:max-w-[450px] text-pretty mr-auto">
          <Link href={`/events/${event.slug}`}>
            <CardTitle className="mb-4">{event.title}</CardTitle>
            <p>{event.summary}</p>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Icons.calender className="size-4" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icons.clock className="size-4" />
                {formatTime(event.time)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icons.mapPin className="size-4" />
                {event.location}
              </div>
            </div>
          </Link>
          <EventActions event={event} className="mt-8" />
        </CardContent>
      </Card>
    </motion.li>
  )
}
