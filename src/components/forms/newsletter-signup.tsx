'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { newsletterSignupSchema } from '@/lib/validators/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewsletterSignup() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof newsletterSignupSchema>>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async ({
    email,
  }: z.infer<typeof newsletterSignupSchema>) => {
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
    <section
      className="bg-gray-50 dark:bg-gray-900/50 scroll-m-16"
      id="newsletter"
    >
      <div className="container py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-lg" />
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
              <p className="text-muted-foreground mb-8">
                Join our newsletter to receive updates about our mission, impact
                stories, and ways you can help make a difference.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex gap-4 max-w-md mx-auto"
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
                            className="flex-1"
                          />
                        </FormControl>
                        <FormDescription>
                          We respect your privacy. Unsubscribe at any time.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                      ? 'Subscribing...'
                      : 'Subscribe'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
