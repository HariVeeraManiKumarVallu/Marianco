'use client'

import { EventSignupForm } from '@/components/forms/event-signup-form'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatTime } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { EventData } from '@/types/event'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function EventsSection({ events }: { events: EventData[] }) {
  const [open, setOpen] = useState(false)

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

        <ul className="space-y-12">
          {events.map((event, index) => (
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
                  'lg:flex max-w-[500px] mx-auto lg:max-w-none shadow-xl border-none'
                )}
              >
                <CardHeader className="relative rounded-lg overflow-hidden h-64 w-full lg:h-auto lg:flex-1 max-w-[704px]">
                  <Image
                    src={
                      event.image.formats?.large?.url ?? event.image.url ?? ''
                    }
                    alt={event.image.alternativeText || ''}
                    className="object-cover"
                    fill
                  />
                </CardHeader>
                <CardContent className="lg:py-12 lg:max-w-[450px] text-pretty mr-auto">
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
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-8">Register Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Register for {event.title}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to register for this event.
                          You will receive a confirmation and event updates via
                          email.
                        </DialogDescription>
                      </DialogHeader>
                      <EventSignupForm
                        documentId={event.documentId}
                        onSuccess={() => setOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>

        {events.length === 0 && (
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
