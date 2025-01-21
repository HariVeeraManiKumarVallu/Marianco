import { Icons } from '@/components/icons'
import { SOCIAL_LINKS } from './social-links'

export const CONTACT_INFO = [
  {
    icon: Icons.mail,
    title: 'Email',
    details: 'team@marianco.org',
    description: 'Send us an email anytime!',
  },
  {
    icon: Icons.arrowRight,
    title: 'Social Media',
    details: 'Connect with us',
    links: SOCIAL_LINKS,
  },
  {
    icon: Icons.mapPin,
    title: 'Office',
    details: 'Stockholm & Gothenburg, Sweden',
  },
  {
    icon: Icons.clock,
    title: 'Working Hours',
    details: 'Monday - Friday',
    description: '8:00 AM - 6:00 PM',
  },
] as const
