import { NAV_LINKS } from '@/config/navigation-links'
import { HandHeart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export default function Navbar() {
  return (
    <div className="border-b border-gray-400 fixed w-full top-0 z-50 bg-black/75 backdrop-blur supports-[backdrop-filter]:bg-black/30 text-white">
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
        <ul className="flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
          <li>
            <Link
              href={'/donations'}
              className={buttonVariants({
                size: 'lg',
                className: 'bg-orange-500',
              })}
            >
              <HandHeart /> Donate
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
