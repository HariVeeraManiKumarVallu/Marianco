import UpcomingEventCard from '@/components/ui/upcoming-event-card'
import { getUpcomingEvents } from '@/lib/queries/strapi/event'
import { EventData } from '@/types/event'

export default async function OtherEventsSection({ id }: { id: string }) {
  const data = await getUpcomingEvents(id)

  return (
    <section className="py-section bg-beige flex-1 w-full">
      <div className="container">
        <h2 className="mb-8">Related Events</h2>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.map((event: EventData, index: number) => (
            <UpcomingEventCard event={event} key={event.id} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
