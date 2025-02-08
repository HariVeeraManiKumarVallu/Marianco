import { ROUTES } from '@/constants/routes'
import { SOCIAL_LINKS } from '@/constants/social-links'
import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
  return (
    <footer className="border-t border-brand-blue-300 bg-brand-blue-900-10 backdrop-blur supports-[backdrop-filter]:bg-brand-blue-900/10 mt-16">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="space-y-4 text-pretty col-span-full xl:col-span-1">
            <div className='h-[102px]'>
              <Logo />
            </div>

            <div className="flex gap-4 ">
              {SOCIAL_LINKS.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={social.label}
                >
                  <social.icon className="size-5 fill-muted-foreground hover:fill-brand-blue-900 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                {
                  href: ROUTES.ABOUT,
                  label: 'About Us',
                },
                {
                  href: ROUTES.PROJECTS,
                  label: 'Projects',
                },
                {
                  href: ROUTES.EVENTS,
                  label: 'Events',
                },
                {
                  href: ROUTES.DONATE,
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
                  href: ROUTES.GET_INVOLVED,
                  label: 'Volunteer',
                },
                {
                  href: ROUTES.GET_INVOLVED,
                  label: 'Become a Member',
                },
                {
                  href: ROUTES.SPONSORS,
                  label: 'Partnerships',
                },
              ].map((link, i) => (
                <li key={link.href + i}>
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
                  href: ROUTES.TERMS_AND_CONDITIONS,
                  label: 'Terms & Conditions',
                },
                {
                  href: ROUTES.PRIVACY_POLICY,
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
              <li>team@marianco.org</li>
              <li>Stockholm &amp; Gothenburg, Sweden</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-blue-300 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Marianco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
