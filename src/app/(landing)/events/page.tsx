'use client'
import TitleSection from '@/components/title-section'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import EventCard from './event-card'

export type EventInfo = {
  id: number
  title: string
  description: string
  date: string
  location: string
  time: string
  imageUrl: string
}

const pastEvents: EventInfo[] = [
  {
    id: 9,
    title: '"Rescue and Rebuild" Fundraiser',
    description:
      'We raised $200,000 to fund rescue missions in Southeast Asia. Learn more about the impact of this life-saving mission.',
    date: 'Date of Event 1',
    location: 'Location of Event 1',
    time: 'Time of Event 1',
    imageUrl: '/event.png',
  },
  {
    id: 10,
    title: 'Child Safety Symposium',
    description:
      'Brining together experts and activists to discuss the future of child protection laws and preventative measures.',
    date: 'Date of Event 2',
    location: 'Location of Event 2',
    time: 'Time of Event 2',
    imageUrl: '/event.png',
  },
  {
    id: 11,
    title: 'Annual Fundraising Gala',
    description:
      'A night of inspiration, connection, and charity. Join us to hear firsthand accounts from survivors and advocates while supporting the work of Marianco.',
    date: 'Date of Event 3',
    location: 'Location of Event 3',
    time: 'Time of Event 3',
    imageUrl: '/event.png',
  },
]

const events: EventInfo[] = [
  {
    id: 1,
    title: 'Annual Fundraising Gala',
    description:
      'A night of inspiration, connection, and charity. Join us to hear firsthand accounts from survivors and advocates while supporting the work of Marianco.',
    date: 'Date of Event 1',
    location: 'Location of Event 1',
    time: 'Time of Event 1',
    imageUrl: '/event.png',
  },
  {
    id: 2,
    title: 'Webinar Series',
    description:
      'Monthly webinars discussing the latest trends in combating child exploitation, featuring experts, survivors, and law enforcement professionals.',
    date: 'Date of Event 2',
    location: 'Location of Event 2',
    time: 'Time of Event 2',
    imageUrl: '/event.png',
  },
  {
    id: 3,
    title: 'Community Outreach Events',
    description:
      'Help spread the word in your local community by joining one of our many awareness-raising initiatives, from walks to educational fairs.',
    date: 'Date of Event 3',
    location: 'Location of Event 3',
    time: 'Time of Event 3',
    imageUrl: '/event.png',
  },
]

export default function Events() {
  return (
    <div className="space-y-20">
      <TitleSection
        title="Our Events"
        description="Join us at our upcoming events to learn more about our mission and how you can help make a difference."
        image={{
          url: '/titleImg.png',
          altText: 'altText',
        }}
      />
      <section>
        <div className="container">
          <h2>Events</h2>
          <p className="text-muted-foreground">
            We host a variety of events aimed at raising awareness, building
            community, and generating support for our initiatives. Whether
            virtual or in person, these events are vital for engaging our
            supporters and spreading the message of Marianco.
          </p>
          <Separator className="mt-4 mb-16" />

          <ul className="space-y-12">
            {events.map((event, index) => (
              <EventCard event={event} key={event.id} index={index} />
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

      <section>
        <div className="container">
          <h2 className="mb-8">Past Events</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
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
                      <Calendar className="w-4 h-4 mr-2" />
                      {/* {format(new Date(event.date), 'MMMM d, yyyy')} */}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      {/* <section>
        <div className="container">
          <h2>Past Events</h2>
          <ul>
            <li>
              <h4>&quot;Rescue and Rebuild&quot; Fundraiser:</h4>
              <p>
                We raised $200,000 to fund rescue missions in Southeast Asia.
                Learn more about the impact of this life-saving mission.
              </p>
            </li>
            <li>
              <h4>Child Safety Symposium:</h4>
              <p>
                Bringing together experts and activists to discuss the future of
                child protection laws and preventative measures.
              </p>
            </li>
          </ul>
        </div>
      </section> */}
    </div>
  )
}
