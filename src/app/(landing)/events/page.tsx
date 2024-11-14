'use client'
import TitleSection from '@/components/title-section'
import { Separator } from '@/components/ui/separator'
import EventCard from './event-card'

export type EventInfo = {
  id: number
  attributes: {
    title: string
    description: string
    date: string
    location: string
    time: string
    imageUrl: string
  }
}

const events: EventInfo[] = [
  {
    id: 1,
    attributes: {
      title: 'Annual Fundraising Gala',
      description:
        'A night of inspiration, connection, and charity. Join us to hear firsthand accounts from survivors and advocates while supporting the work of Marianco.',
      date: 'Date of Event 1',
      location: 'Location of Event 1',
      time: 'Time of Event 1',
      imageUrl: '/event.png',
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Webinar Series',
      description:
        'Monthly webinars discussing the latest trends in combating child exploitation, featuring experts, survivors, and law enforcement professionals.',
      date: 'Date of Event 2',
      location: 'Location of Event 2',
      time: 'Time of Event 2',
      imageUrl: '/event.png',
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Community Outreach Events',
      description:
        'Help spread the word in your local community by joining one of our many awareness-raising initiatives, from walks to educational fairs.',
      date: 'Date of Event 3',
      location: 'Location of Event 3',
      time: 'Time of Event 3',
      imageUrl: '/event.png',
    },
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
      <div className="container">
        <h2>Events</h2>
        <p className="text-muted-foreground">
          We host a variety of events aimed at raising awareness, building
          community, and generating support for our initiatives. Whether virtual
          or in person, these events are vital for engaging our supporters and
          spreading the message of Marianco.
        </p>
        <Separator className="my-8" />

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
      <section>
        <div className="container">
          <h2>Past Events:</h2>
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
      </section>
    </div>
  )
}
