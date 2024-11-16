'use client'
import TitleSection from '@/components/title-section'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Check,
  Gift,
  Handshake,
  Heart,
} from 'lucide-react'
import Link from 'next/link'

interface PartnershipTierProps {
  title: string
  amount: string
  benefits: string[]
}

function PartnershipTier({ title, amount, benefits }: PartnershipTierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/50 transition-colors duration-300">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div>
            <span className="text-3xl font-bold">{amount}</span>
            <span className="text-muted-foreground ml-1">/year</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="rounded-full p-1 bg-primary/10 text-primary">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full group" variant="outline" size="lg">
            <span className="flex items-center justify-center gap-2">
              Select Plan
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function Sponsors() {
  return (
    <div className="space-y-20">
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
          <h2 className=" mb-8 flex items-center gap-3">
            <Handshake className="w-8 h-8 text-blue-600" />
            Why Partner with Marianco?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            When you partner with Marianco, you become part of a global network
            dedicated to eradicating child exploitation. Your support will not
            only help children in immediate danger but will also ensure
            long-term solutions through prevention, education, and advocacy.
          </p>
        </motion.div>
      </section>

      {/* Partnership Tiers */}
      <section>
        <div className="container ">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            Corporate Sponsorship Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PartnershipTier
              title="Bronze Partner"
              amount="$5,000"
              benefits={[
                'Company logo on our website',
                'Recognition in promotional materials',
                'Two complimentary gala tickets',
                'Quarterly impact reports',
              ]}
            />
            <PartnershipTier
              title="Silver Partner"
              amount="$10,000"
              benefits={[
                'Recognition at all Marianco events',
                'Prominent logo placement',
                'Four gala tickets',
                'Personal facility tour',
                'Monthly partnership highlights',
              ]}
            />
            <PartnershipTier
              title="Gold Partner"
              amount="$25,000"
              benefits={[
                'All Silver Partner benefits',
                'Media campaign mentions',
                'Co-host opportunity',
                'Executive briefings',
                'Custom impact initiatives',
              ]}
            />
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
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" text-center bg-blue-50 rounded-xl p-8 container"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-700 mb-6">
            Contact us to discuss partnership opportunities that align with your
            organization&apos;s values and goals.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group">
            Start the Conversation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
// return (
//   <>
//     <h1>Partner with Us for a safer World for Children</h1>
//     <p>
//       Marianco&apos;s work is made possible by the incredible contributions of
//       our partners. By collaborating with us, you can make a lasting impact on
//       the lives of vulnerable children while receiving meaningful recognition
//       and engagement opportunities.
//     </p>
//     <h2>Why partner with Marianco?</h2>
//     <p>
//       When you partner with Marianco, you become part of a global network
//       dedicated to eradicating child exploitation. Your support will not only
//       help children in immediate danger but will also ensure long-term
//       solutions through prevention, education, and advocacy.
//     </p>
//     <h2>Corporate Sponsorship Tiers</h2>
//     <ul>
//       <li>
//         <h4>Bronze Partner ($5,000+):</h4>
//         <p>
//           Includes your company logo on our website and in select promotional
//           materials, as well as two complimentary tickets to our annual gala.
//         </p>
//         <h4>Silver Partner ($10,000+):</h4>
//         <p>
//           Recognition at all Marianco events and your logo featured
//           prominently on our materials, plus four gala tickets and a personal
//           tour of our facilities.
//         </p>
//         <h4>Gold Partner ($25,000+):</h4>
//         <p>
//           In addition to all silver benefits, your company will receive
//           special mentions in media campaigns and the opportunity to co-host a
//           Marianco event.
//         </p>
//       </li>
//     </ul>

//     <h2>Foundation Partnerships</h2>

//     <p>
//       We invite foundations to collaborate with us on special initiatives,
//       such as funding the creation of new safe homes, expanding our advocacy
//       work, or sponsoring research on child exploitation.
//     </p>
//     <h2>In-Kind Donations</h2>
//     <p>
//       We gratefully accept in-kind donations that can help in our
//       operations—legal services, technology, marketing, and more. Your
//       company’s expertise can help us extend our reach and impact.
//     </p>
//   </>
//
