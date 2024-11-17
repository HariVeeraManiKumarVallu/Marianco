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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { JoinFormData, joinFormSchema } from '@/lib/schemas/form-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function JoinForm() {
  const form = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = (data: JoinFormData) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <Card className="p-6 md:p-8 hover:border-brand-blue-500/30">
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
                <FormLabel>Phone Number</FormLabel>
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you like to help?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="sponsor">Sponsor</SelectItem>
                    <SelectItem value="advocate">Advocate</SelectItem>
                    <SelectItem value="professional">
                      Professional Services
                    </SelectItem>
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
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your interests and how you'd like to contribute"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className="w-full lg:flex lg:w-auto lg:mx-auto"
            >
              <Send className="size-4" /> Submit Application
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
