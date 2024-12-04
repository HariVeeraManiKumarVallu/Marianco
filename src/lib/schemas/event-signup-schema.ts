import * as z from 'zod'

export const eventSignupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  numAttending: z
    .number()
    .min(1, 'Number of attendees must be at least 1')
    .max(100, 'Please contact us directly for groups larger than 100'),
  organization: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy',
  }),
})

export type EventSignupData = z.infer<typeof eventSignupSchema>
