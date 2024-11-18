import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore Marianco\'s ongoing projects and initiatives. Learn about our current efforts in child protection, education, and community support.',
  openGraph: {
    title: 'Projects | Marianco',
    description:
      'Explore Marianco\'s ongoing projects and initiatives. Learn about our current efforts in child protection, education, and community support.',
  },
}

export default function Page() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="container flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-center mt-48">Coming soon...</p>
      </div>
    </div>
  )
}

{
  /* <section className="container">
        <h3>Our Approach</h3>
        <p>
          We approach our mission with a three-pronged strategy: prevention,
          rescue, and rehabilitation. Through community education and awareness
          programs, we work to prevent exploitation before it happens. For those
          who have already been victimized, our rescue missions, legal support,
          and safe homes provide immediate aid. Lastly, we offer long-term
          rehabilitation services, including emotional and psychological care,
          education, and empowerment programs to help children reclaim their
          futures.
        </p>
      </section> */
}
