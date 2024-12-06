'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { useToast } from '@/hooks/use-toast'
import { Share2 } from 'lucide-react'
import Link from 'next/link'
import { EventRegistrationDialog } from './event-registration-dialog'

type Props = {
  event: {
    title: string
    documentId: string
    slug: string
  }
  variant?: 'default' | 'detail'
  className?: string
}

export function EventActions({
  event,
  variant = 'default',
  className = '',
}: Props) {
  const { toast } = useToast()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: 'Link copied!',
          description: 'Event link has been copied to your clipboard',
        })
      } catch (error) {
        console.error('Copy failed:', error)
        toast({
          title: 'Copy failed',
          description: 'Could not copy the link to your clipboard',
          variant: 'destructive',
        })
      }
    }
  }

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
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleShare}
        >
          <Share2 className="mr-2 size-4" />
          Share
        </Button>
      )}
    </div>
  )
}
