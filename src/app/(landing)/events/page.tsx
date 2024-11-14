import TitleSection from '@/components/title-section'
import EventsSection from './events-sections'
import PastEventsSection from './past-events-section'

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

// const events: EventInfo[] = [
//   {
//     id: 1,
//     title: 'Annual Fundraising Gala',
//     description:
//       'A night of inspiration, connection, and charity. Join us to hear firsthand accounts from survivors and advocates while supporting the work of Marianco.',
//     date: 'Date of Event 1',
//     location: 'Location of Event 1',
//     time: 'Time of Event 1',
//     imageUrl: '/event.png',
//   },
//   {
//     id: 2,
//     title: 'Webinar Series',
//     description:
//       'Monthly webinars discussing the latest trends in combating child exploitation, featuring experts, survivors, and law enforcement professionals.',
//     date: 'Date of Event 2',
//     location: 'Location of Event 2',
//     time: 'Time of Event 2',
//     imageUrl: '/event.png',
//   },
//   {
//     id: 3,
//     title: 'Community Outreach Events',
//     description:
//       'Help spread the word in your local community by joining one of our many awareness-raising initiatives, from walks to educational fairs.',
//     date: 'Date of Event 3',
//     location: 'Location of Event 3',
//     time: 'Time of Event 3',
//     imageUrl: '/event.png',
//   },
// ]

export default async function Events() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  })
  const data: EventInfo[] = await res.json()
  console.log(data)
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
      <EventsSection events={data.data} />
      <PastEventsSection pastEvents={pastEvents} />
    </div>
  )
}
