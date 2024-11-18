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
    title: 'Social Media',
    details: 'Connect with us',
    links: [
      {
        icon: Icons.facebook,
        href: 'https://www.facebook.com/mariancoorg',
        label: 'Facebook',
      },
      {
        icon: Icons.instagram,
        href: 'https://www.instagram.com/mariancorg/?igsh=MXBxMnkzaWtxbXBlYw==',
        label: 'Instagram',
      },
      {
        icon: Icons.linkedin,
        href: 'https://www.linkedin.com/company/marianco/',
        label: 'LinkedIn',
      },
      {
        icon: Icons.twitter,
        href: 'https://x.com/mariancoorg',
        label: 'Twitter',
      },
      {
        icon: Icons.tiktok,
        href: 'https://www.tiktok.com/@mariancoorg',
        label: 'TikTok',
      },
    ],
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
