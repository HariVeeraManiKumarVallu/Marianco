import { z } from 'zod'

export const getInvolvedFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  option: z.enum(['volunteer', 'partner', 'donate', 'advocate']),
  message: z.string().min(1, 'Message is required'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy to proceed',
  }),
})

export type GetInvolvedFormData = z.infer<typeof getInvolvedFormSchema>
