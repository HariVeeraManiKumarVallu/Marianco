import NewsletterSignup from '@/components/forms/newsletter-signup'
import { buttonVariants } from '@/components/ui/button'
import WorldMapHero from '@/components/world-map-hero'
import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <div className="container p-20 flex items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-5xl text-pretty font-bold">
            Together, We Can Protect Every Child
          </h1>
          <p>
            Partner with us to eradicate child exploitation and create a world
            where every child can grow up safe, empowered, and loved. Together,
            we can give children the future they deserve.
          </p>
          <div>
            <Link href={'/membership'} className={buttonVariants()}>
              Join the Movement
            </Link>
            <Link href={'/donations'} className={buttonVariants()}>
              Make a Donation
            </Link>
          </div>
        </div>
        <div className="w-full">
          <WorldMapHero />
        </div>
        {/* <Image src="/hero.jpg" width={400} height={500} alt="" /> */}
      </div>
      <NewsletterSignup />
    </section>
  )
}
