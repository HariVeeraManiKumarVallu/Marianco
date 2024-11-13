import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-36 bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div className="space-y-2 text-pretty col-span-full lg:col-span-1">
            <div>
              <Image
                src="/logo.png"
                width={178}
                height={100}
                alt="Marianco logo"
              />
            </div>
            {/* <small className="text-sm font-medium leading-none text-muted-foreground">
              Fighting to end child trafficking and protect vulnerable children
              worldwide.
            </small> */}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-foreground">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-foreground">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-foreground">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Get Involved</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/volunteer" className="hover:text-foreground">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-foreground">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:text-foreground">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Get Involved</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@hopefoundation.org</li>
              <li>+1 (555) 123-4567</li>
              <li>
                123 Hope Street
                <br />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Hope Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
