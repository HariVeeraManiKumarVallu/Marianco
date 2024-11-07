import { NAV_LINKS } from '@/config/navigation-links'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between">
        <div>
          <Link href={'/'}>
            <Image
              src="/marianco logo-p-500.jpg"
              width={178}
              height={100}
              alt="logo"
            />
          </Link>
        </div>
        <ul className="flex gap-4 items-center">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
