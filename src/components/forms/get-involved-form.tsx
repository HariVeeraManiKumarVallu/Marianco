'use client'

import { Icons } from '@/components/icons'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  GetInvolvedFormData,
  getInvolvedFormSchema,
} from '@/lib/schemas/get-involved-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GDPRCheckbox } from '../ui/gdpr-checkbox'

const options = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'partner', label: 'Partner with Us' },
  { value: 'donate', label: 'Make a Donation' },
  { value: 'advocate', label: 'Become an Advocate' },
] as const

export function GetInvolvedForm() {
  const { toast } = useToast()
  const form = useForm<GetInvolvedFormData>({
    resolver: zodResolver(getInvolvedFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      option: 'volunteer',
      message: '',
      gdprConsent: false,
    },
  })

  async function onSubmit(data: GetInvolvedFormData) {
    try {
      const response = await fetch('/api/get-involved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send request')
      }

      toast({
        title: 'Request sent!',
        description: "Thank you for your interest. We'll be in touch soon.",
      })

      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send request. Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="option"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you like to help?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about how you'd like to get involved..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <GDPRCheckbox control={form.control} />

          <div className="flex justify-center items-center">
            <Button
              type="submit"
              size="lg"
              className="w-full lg:w-auto lg:mx-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'} <Icons.send />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
