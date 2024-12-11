import Cart from '@/components/cart'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAV_LINKS } from '@/config/navigation-links'
import { ROUTES } from '@/config/routes'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from './icons'
import { Button, buttonVariants } from './ui/button'

export default function Navbar() {
  return (
    <header>
      <nav className="fixed lg:relative w-full top-0 z-50 bg-background border-b border-gray-200">
        <div className="h-20 container flex items-center justify-between">
          <Link href={ROUTES.HOME}>
            <Image
              src="/logo.png"
              width={178}
              height={100}
              alt="logo"
              className="py-2"
            />
          </Link>
          <ul className="hidden lg:flex items-center gap-4 xl:gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-brand-blue-900 transition-colors duration-300"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="items-center gap-4 hidden lg:flex">
            <Cart />
            <Link className={buttonVariants()} href={ROUTES.DONATE}>
              <Icons.handHeart />
              Donate
            </Link>
          </div>
          <div className="flex items-center lg:hidden gap-4">
            <Cart />
            <Sheet>
              <SheetTrigger>
                <Icons.menu size={36} className="text-black" />
              </SheetTrigger>
              <SheetContent>
                <VisuallyHidden.Root>
                  <SheetTitle>Mobile Navigation</SheetTitle>
                </VisuallyHidden.Root>
                <SheetClose asChild>
                  <Link href={ROUTES.HOME}>
                    <Image
                      src="/logo.png"
                      width={178}
                      height={100}
                      alt="logo"
                      className="py-2"
                    />
                  </Link>
                </SheetClose>
                <ul className="space-y-8 my-8">
                  {NAV_LINKS.map(link => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link href={link.href}>{link.title}</Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <Cart variant="full" />
                <SheetClose asChild>
                  <Link
                    className={buttonVariants({ className: 'w-full' })}
                    href={ROUTES.DONATE}
                  >
                    <Icons.handHeart />
                    Donate
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
