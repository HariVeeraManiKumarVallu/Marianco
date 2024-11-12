import { NAV_LINKS } from '@/config/navigation-links'
import { HandHeart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

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
            <Button
              className="bg-orange-500 rounded-full text-lg"
              size={'lg'}
              asChild
            >
              <Link href={'/donations'}>
                <HandHeart
                  style={{
                    width: '24px',
                    height: '24px',
                  }}
                />
                <span className="text-lg">Donate</span>
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
