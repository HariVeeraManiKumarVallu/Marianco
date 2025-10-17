import { Toaster } from '@/components/ui/toaster'
import GoogleAnalytics from '@/services/google-analytics'
import HotJar from '@/services/hotjar'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import React from 'react'
import CurrencyInitializer from '@/components/currency-initializer'
import inter from 'next/font/google'

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

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL !== ''
    ? process.env.NEXT_PUBLIC_APP_URL
    : 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: 'Marianco',
    template: '%s | Marianco',
  },
  description: 'Your description here',
  metadataBase: new URL(appUrl),
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
        <script
          dangerouslySetInnerHTML={{
            __html:`(function(){try{var w=function(n){if(!n||!n.attributes)return;for(const a of [...n.attributes])if(/^bis_/.test(a.name))n.removeAttribute(a.name);for(const c of n.children)w(c);} ;w(document.documentElement);}catch(e){}})();`
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
        <CurrencyInitializer />
      </body>
    </html>
  )
}
