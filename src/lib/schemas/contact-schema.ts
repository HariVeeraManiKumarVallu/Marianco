import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(100),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' })
    .max(100),
  subject: z
    .string()
    .trim()
    .min(1, { message: 'Subject is required' })
    .max(255, { message: 'Subject must be at most 255 characters' }),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(1000, { message: 'Message must be at most 1000 characters' }),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy to proceed',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
