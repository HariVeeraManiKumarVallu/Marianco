'use client'

import { EventSignupForm } from '@/components/forms/event-signup-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EVENT_REGISTRATION_SUCCESS_TIMER } from '@/constants/settings'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  eventTitle: string
  documentId: string
  className?: string
}

export function EventRegistrationDialog({ eventTitle, documentId, className }: Props) {
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false)
        setOpen(false)
      }, EVENT_REGISTRATION_SUCCESS_TIMER)

      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  function handleSuccess() {
    setIsSuccess(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Register Now</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        {isSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="font-semibold text-lg">
              Registration successful!
            </DialogTitle>

            
            <p className="text-muted-foreground">
              Thank you for signing up.
              <br />
              We&apos;ll send you a confirmation email shortly.
            </p>
            <p className="font-medium text-brand-blue-900">
              Looking forward to seeing you there! 🎉
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Register for {eventTitle}</DialogTitle>
            </DialogHeader>
            <EventSignupForm
              documentId={documentId}
              onSuccess={handleSuccess}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
