import { z } from 'zod'

export const NewsletterSignupSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address',
    })
    .min(2)
    .max(100),
})
