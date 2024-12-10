import { Toaster } from '@/components/ui/toaster'
import GoogleAnalytics from '@/services/google-analytics'
import HotJar from '@/services/hotjar'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
  preload: true,
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Marianco',
    template: '%s | Marianco',
  },
  description: 'Your description here',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Marianco',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@marianco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <HotJar />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
