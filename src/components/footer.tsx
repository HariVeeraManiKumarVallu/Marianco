import { SOCIAL_LINKS } from '@/config/social-links'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-36 bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div className="space-y-4 text-pretty col-span-full xl:col-span-1">
            <div className="relative">
              <Image
                src="/logo.png"
                width={178}
                height={100}
                alt="Marianco logo"
              />
            </div>
            <p className="text-sm font-medium leading-none text-muted-foreground ">
              Fighting to end child trafficking and protect vulnerable children
              worldwide.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={social.label}
                >
                  <social.icon className="size-5 fill-muted-foreground hover:fill-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                {
                  href: '/about',
                  label: 'About Us',
                },
                {
                  href: '/projects',
                  label: 'Projects',
                },
                {
                  href: '/events',
                  label: 'Events',
                },
                {
                  href: '/donate',
                  label: 'Donate',
                },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Get Involved</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                {
                  href: '/volunteer',
                  label: 'Volunteer',
                },
                {
                  href: '/membership',
                  label: 'Become a Member',
                },
                {
                  href: '/sponsors-and-partners',
                  label: 'Partnerships',
                },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Other Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                {
                  href: '/terms-and-conditions',
                  label: 'Terms & Conditions',
                },
                {
                  href: '/privacy-policy',
                  label: 'Privacy Policy',
                },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@hopefoundation.org</li>
              <li>+1 (555) 123-4567</li>
              <li>
                123 Hope Street
                <br />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Hope Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
