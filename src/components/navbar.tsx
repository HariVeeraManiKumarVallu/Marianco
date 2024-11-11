import { NAV_LINKS } from '@/config/navigation-links'
import { HandHeart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export default function Navbar() {
  return (
    <div className="border-b-2 ">
      <nav className="container flex items-center justify-between">
        <Link href={'/'}>
          <Image
            src="/marianco logo-p-500.jpg"
            width={178}
            height={100}
            alt="logo"
            className="py-2"
          />
        </Link>
        <ul className="flex items-center gap-4">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <Link href={'/donations'} className={buttonVariants()}>
          <HandHeart /> Donate
        </Link>
      </nav>
    </div>
  )
}
