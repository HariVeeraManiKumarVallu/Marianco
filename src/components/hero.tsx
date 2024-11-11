import Link from 'next/link'
import { buttonVariants } from './ui/button'

export default function Hero() {
  return (
    <article className="flex-grow min-w-96 xl:min-w-[500px]">
      <div className="lg:max-w-lg space-y-8 text-center lg:text-start lg:py-12 pb-8">
        <h1 className="text-5xl xl:text-6xl text-pretty font-bold ">
          <span className="text-orange-500 ">Protect, </span>
          Educate, <span>Empower</span>
        </h1>
        <p className="max-w-prose">
          Partner with us in our mission to{' '}
          <span className="text-orange-500">eradicate child exploitation</span>{' '}
          and create a world where every child can grow up safe, empowered, and
          loved. Together, we can give children the future they deserve.
        </p>
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <Link href={'/membership'} className={buttonVariants()}>
            Join the Movement
          </Link>
          <Link href={'/donations'} className={buttonVariants()}>
            Make a Donation
          </Link>
        </div>
      </div>
    </article>
  )
}
