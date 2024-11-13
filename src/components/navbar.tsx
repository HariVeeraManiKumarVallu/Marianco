import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAV_LINKS } from '@/config/navigation-links'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { HandHeart, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Navbar() {
  return (
    <header>
      <nav className="border-b fixed w-full top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between">
          <Link href={'/'}>
            <Image
              src="/logo.png"
              width={178}
              height={100}
              alt="logo"
              className="py-2"
            />
          </Link>
          <ul className="hidden lg:flex items-center gap-4 xl:gap-10">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
          <Button asChild className="hidden lg:flex">
            <Link href={'/donations'}>
              <HandHeart />
              Donate
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu size={36} />
            </SheetTrigger>
            <SheetContent>
              <VisuallyHidden.Root>
                <SheetTitle>Mobile Navigation</SheetTitle>
              </VisuallyHidden.Root>
              <Link href={'/'}>
                <Image
                  src="/marianco logo-p-500.jpg"
                  width={178}
                  height={100}
                  alt="logo"
                  className="py-2"
                />
              </Link>
              <ul className="space-y-8 mt-8">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
                <li>
                  <Button asChild className="w-full">
                    <Link href={'/donations'}>
                      <HandHeart />
                      Donate
                    </Link>
                  </Button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
