import { z } from 'zod'

export const newsletterSignupSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address',
    })
    .min(2)
    .max(100),
})

// export const donationsSchema = z.object({
//   oneTimeAmount: z
//     .string()
//     .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
//       message: 'Please enter a valid amount',
//     }),
//   monthlyAmount: z
//     .string()
//     .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
//       message: 'Please enter a valid amount',
//     }),
//   sponsorshipLevel: z.enum(['50', '100', '200']),
//   projectType: z.enum(['education', 'healthcare', 'environment', 'community']),
//   // activeTab: z.enum(['oneTime', 'monthly', 'sponsor', 'project']),
// })

// export type DonationFormValues = z.infer<typeof donationsSchema>
