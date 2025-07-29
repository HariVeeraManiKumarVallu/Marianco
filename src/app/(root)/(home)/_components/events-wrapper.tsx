import { getUpcomingEvents } from '@/lib/queries/strapi/event'
import UpcomingEvents from './upcoming-events'

export default async function EventsWrapper() {
  const data = await getUpcomingEvents()

  console.log('EventsWrapper fetched data:', data)

  return <UpcomingEvents events={data} />
}
