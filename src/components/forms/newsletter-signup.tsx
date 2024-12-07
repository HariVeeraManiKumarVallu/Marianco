'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  NewsletterSignupData,
  newsletterSignupSchema,
} from '@/lib/schemas/form-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GDPRCheckbox } from '../ui/gdpr-checkbox'

export default function NewsletterSignup() {
  const { toast } = useToast()

  const form = useForm<NewsletterSignupData>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: {
      email: '',
      gdprConsent: false,
    },
  })

  const handleSubmit = async ({ email }: NewsletterSignupData) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Thank you for subscribing to our newsletter.',
        })

        return form.resetField('email')
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <article className="scroll-m-16 bg-background py-section" id="newsletter">
      <div className="container  ">
        <div className="relative rounded-lg shadow-lg p-8 text-center ">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-muted-foreground mb-8 max-w-prose mx-auto">
            Join our newsletter to receive updates about our mission, impact
            stories, and ways you can help make a difference.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 max-w-md mx-auto"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="flex-1 focus-visible:ring-brand-blue-900"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <GDPRCheckbox control={form.control} />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-brand-blue-900 text-brand-white hover:bg-brand-blue-900/90"
              >
                {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </article>
  )
}
