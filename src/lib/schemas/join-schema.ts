import { z } from 'zod'

export const joinFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  role: z.enum(['volunteer', 'donor', 'advocate', 'professional'], {
    required_error: "Please select how you'd like to help",
  }),
  message: z.string().optional(),
})

export type JoinFormData = z.infer<typeof joinFormSchema>
