'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  EventSignupData,
  eventSignupSchema,
} from '@/lib/schemas/event-signup-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { GDPRCheckbox } from '../ui/gdpr-checkbox'

interface EventSignupFormProps {
  onSuccess: () => void
  documentId: string
}

export function EventSignupForm({
  onSuccess,
  documentId,
}: EventSignupFormProps) {
  const { toast } = useToast()

  const form = useForm<EventSignupData>({
    resolver: zodResolver(eventSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      numAttending: 1,
      organization: '',
      gdprConsent: false,
    },
  })

  async function onSubmit(data: EventSignupData) {
    try {
      const response = await fetch(`/api/event-signup/${documentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit signup')
      }

      form.reset()
      onSuccess()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit registration. Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id='name' placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id='your-email' placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input id='city' placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numAttending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Attendees</FormLabel>
                <FormControl>
                  <Input
                    id='number'
                    type="number"
                    min={1}
                    max={100}
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization (Optional)</FormLabel>
                <FormControl>
                  <Input id='organization' placeholder="Your organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gdprConsent"
            render={() => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <GDPRCheckbox control={form.control} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </form>
      </Form>
    </Card>
  )
}
