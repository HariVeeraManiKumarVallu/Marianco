import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: {
    default: 'Marianco - Protecting Children, Building Futures',
    template: '%s | Marianco',
  },
  description:
    'Marianco is dedicated to protecting children from exploitation and creating a safer future through education, support, and advocacy.',
  keywords: [
    'child protection',
    'nonprofit',
    'children advocacy',
    'child welfare',
    'child safety',
    'education',
    'support',
    'donation',
    'sponsorship',
  ],
  authors: [{ name: 'Marianco' }],
  creator: 'Marianco',
  publisher: 'Marianco',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marianco.org',
    siteName: 'Marianco',
    title: 'Marianco - Protecting Children, Building Futures',
    description:
      'Marianco is dedicated to protecting children from exploitation and creating a safer future through education, support, and advocacy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marianco - Protecting Children, Building Futures',
    description:
      'Marianco is dedicated to protecting children from exploitation and creating a safer future through education, support, and advocacy.',
    creator: '@marianco',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#ffffff',
}

export default defaultMetadata
