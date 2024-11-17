import { Icons } from '@/components/icons'

export const CONTACT_INFO = [
  {
    icon: Icons.mail,
    title: 'Email',
    details: 'team@marianco.org',
    description: 'Send us an email anytime!',
  },
  {
    icon: Icons.arrowRight,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 6pm',
  },
  {
    icon: Icons.mapPin,
    title: 'Office',
    details: '123 Hope Street, New York, NY 10001',
    description: 'Come visit our office',
  },
  {
    icon: Icons.clock,
    title: 'Working Hours',
    details: 'Monday - Friday',
    description: '8:00 AM - 6:00 PM',
  },
] as const
