import { getUpcomingEvents } from '@/lib/queries/strapi/event'
import UpcomingEvents from './upcoming-events'

export default async function EventsWrapper() {
  const data = await getUpcomingEvents()

  return <UpcomingEvents events={data.data} />
}
