import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 mt-12 border-t-2">
      <div className="container flex items-center justify-between">
        <div>
          <div>
            <Image
              src="/marianco logo-p-500.jpg"
              width={178}
              height={100}
              alt="Marianco logo"
            />
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Marpuianco. All Rights Reserved.
          </p>
        </div>

        <ul>
          <li>
            <Link href={'/terms-and-conditions'}>Terms & Conditions</Link>
          </li>
          <li>
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
