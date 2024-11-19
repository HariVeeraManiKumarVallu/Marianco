import { z } from 'zod'

export const newsletterSignupSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address',
    })
    .min(2)
    .max(100),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy to proceed',
  }),
})

export type NewsletterSignupData = z.infer<typeof newsletterSignupSchema>
