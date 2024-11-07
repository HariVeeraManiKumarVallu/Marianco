import { NAV_LINKS } from '@/config/navigation-links'
import { HandHeart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  return (
    <div>
      <nav className="container flex items-center justify-between py-2">
        <Link href={'/'}>
          <Image
            src="/marianco logo-p-500.jpg"
            width={178}
            height={100}
            alt="logo"
          />
        </Link>
        <ul className="flex gap-4 items-center">
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
export default Navbar
