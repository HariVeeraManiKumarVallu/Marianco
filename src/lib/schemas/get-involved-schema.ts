import { z } from 'zod'

export const getInvolvedFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  option: z.enum(['volunteer', 'partner', 'donate', 'advocate']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type GetInvolvedFormData = z.infer<typeof getInvolvedFormSchema>
