'use client'
import { default as SponsorshipTier } from '@/components/sponsorship-tier'
import TitleSection from '@/components/title-section'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { SPONSORSHIP_TIERS } from '@/config/sponsorship-tiers'
import { motion } from 'framer-motion'
import { ArrowRight, Gift, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Sponsors() {
  return (
    <div className="space-y-section">
      <TitleSection
        title={
          <>
            <span>Partner with Us,</span>
            <br />
            <span>
              for a Safer World <br /> for Children
            </span>
          </>
        }
        description="Join Marianco in our mission to protect vulnerable children and create lasting change through meaningful partnerships."
        image={{
          url: '/titleImg.png',
          altText: 'Marianco Logo',
        }}
      />

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
        >
          <h2 className=" mb-8">Why Partner with Marianco?</h2>
          <p className="max-w-prose">
            When you partner with Marianco, you become part of a global network
            dedicated to eradicating child exploitation. Your support will not
            only help children in immediate danger but will also ensure
            long-term solutions through prevention, education, and advocacy.
          </p>
        </motion.div>
      </section>

      {/* Partnership Tiers */}
      <section>
        <div className="container">
          <h2 className=" mb-8 lg:mb-12 ">Corporate Sponsorship Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6 ">
            {SPONSORSHIP_TIERS.map(tier => (
              <SponsorshipTier
                key={tier.title}
                title={tier.title}
                amount={tier.amount}
                benefits={tier.benefits}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Partnership Options */}
      <section>
        <div className="container grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-blue-600" />
              Foundation Partnerships
            </h2>
            <p className="text-gray-700 mb-4">
              We invite foundations to collaborate with us on special
              initiatives, such as funding the creation of new safe homes,
              expanding our advocacy work, or sponsoring research on child
              exploitation.
            </p>

            <Link
              href="/get-involved"
              className={buttonVariants({
                variant: 'outline',
                className: 'group',
              })}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Gift className="w-6 h-6 text-blue-600" />
              In-Kind Donations
            </h2>
            <p className="text-gray-700 mb-4">
              We gratefully accept in-kind donations that can help in our
              operations—legal services, technology, marketing, and more. Your
              company&apos;s expertise can help us extend our reach and impact.
            </p>
            <Link
              href="/donate"
              className={buttonVariants({
                variant: 'outline',
                className: 'group',
              })}
            >
              Donate
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" text-center bg-blue-50 rounded-xl p-8 container"
        >
          <h2
            className="
        mb-4"
          >
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-700 mb-6">
            Contact us to discuss partnership opportunities that align with your
            organization&apos;s values and goals.
          </p>
          <Link
            href={ROUTES.SPONSORS}
            className={buttonVariants({ size: 'lg' })}
          >
            Start the Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
