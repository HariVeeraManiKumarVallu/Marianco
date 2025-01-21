const navLinks = [
  {
    title: 'Who We Are',
    href: '/about-us',
  },
  { title: 'Get Involved', href: '/get-involved' },
  {
    title: 'Sponsors & Partners',
    href: '/sponsors',
  },
  {
    title: 'Events',
    href: '/events',
  },
  { title: 'Articles', href: '/articles' },
  {
    title: 'Store',
    href: '/store',
    hidden: process.env.NODE_ENV === 'production',
  },
  // { title: 'Projects', href: '/projects' },
  {
    title: 'Contact Us',
    href: '/contact',
  },
]

export const NAV_LINKS = navLinks.filter(link => !link.hidden)
