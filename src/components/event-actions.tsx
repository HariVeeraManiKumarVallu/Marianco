'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/use-toast'
import { EventData } from '@/types/event'
import Link from 'next/link'
import { EventRegistrationDialog } from './event-registration-dialog'
import { ShareButtons } from './share-buttons'

type Props = {
  event: EventData
  variant?: 'default' | 'detail'
  className?: string
}

export function EventActions({
  event,
  variant = 'default',
  className = '',
}: Props) {
  const { toast } = useToast()

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <EventRegistrationDialog
        eventTitle={event.title}
        documentId={event.documentId}
        className="w-full sm:w-auto"
      />
      {variant === 'default' ? (
        <Button variant="outline" className="w-full sm:w-auto" asChild>
          <Link href={`${ROUTES.EVENTS}/${event.slug}`}>Learn More</Link>
        </Button>
      ) : (
        <ShareButtons title={event.title} summary={event.summary} />
      )}
    </div>
  )
}
