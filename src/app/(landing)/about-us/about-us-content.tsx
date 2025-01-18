'use client'

import CtaSection from '@/components/cta-section'
import { Icons } from '@/components/icons'
import TitleSection from '@/components/title-section'
import { ROUTES } from '@/config/routes'
import { BicepsFlexed, Crown, Scale } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function AboutUsContent({ teamMembers }: { teamMembers: any }) {
  return (
    <div className="space-y-page">
      <TitleSection
        title="Who we are"
        description="We strive to protect the most vulnerable children, ensuring they have a safe space to grow, thrive, and reclaim their lives."
        image={{
          url: 'https://marianco-images.s3.eu-north-1.amazonaws.com/title_img_e7bc233513.jpg',
          altText: 'hands reaching out',
        }}
      />
      <section>
        <div className="container">
          <h2>Our Story</h2>
          <div className="flex flex-col md:flex-row gap-8 mt-8 mx-auto max-w-prose md:max-w-none">
            <div className="relative rounded-lg overflow-hidden flex-1 min-h-64 min-w-64 lg:max-w-[350px]">
              <Image
                src="https://marianco-images.s3.eu-north-1.amazonaws.com/francisco_padilla_5caf2df652_e795575058.png"
                fill
                className="object-contain lg:object-cover"
                alt="Francisco Padilla"
              />
            </div>
            <div className="max-w-prose">
              <p className="mb-8">
                Marianco is a non-profit organization founded by Francisco
                Padilla, a former street orphan from Cartagena, Colombia. His
                biological mother, Maria, was a child prostitute living in the
                Cartagena slums. We are dedicated to combating child
                trafficking, child prostitution, and child pornography. We care
                for all children and provide even extra careful support for
                children under the age of 15.
              </p>
              <p>
                With a deep personal connection to our mission, we strive to
                provide safety, support, and hope to children in need. The
                Marianco team is on a mission to eradicate the sexual
                exploitation of young children. Our organization was founded by
                individuals who could not stand by while children across the
                world continued to suffer from the horrors of trafficking,
                exploitation, and abuse. Through targeted interventions,
                powerful advocacy, and hands-on support, Marianco seeks to
                protect the most vulnerable children, ensuring they have a safe
                space to grow, thrive, and reclaim their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-section bg-beige">
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row gap-8 w-full">
            <div className="md:max-w-[350px] lg:max-w-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2>Our Mission</h2>
                <p className="text-muted-foreground">
                  To protect vulnerable children from trafficking through
                  prevention, rescue, and rehabilitation, while working to
                  create lasting change in affected communities.
                </p>
              </motion.div>

              <ul className="space-y-8">
                {[
                  {
                    icon: Icons.protection,
                    title: 'Protection',
                    description:
                      'Every child deserves to feel safe, and we work tirelessly to provide environments where they can be free from harm.',
                  },
                  {
                    icon: Crown,
                    title: 'Dignity',
                    description:
                      'We treat every individual, especially children, with the respect and dignity they deserve.',
                  },
                  {
                    icon: BicepsFlexed,
                    title: 'Empowerment',
                    description:
                      'We empower children and communities with the resources, support, and knowledge needed to combat exploitation.',
                  },
                  {
                    icon: Scale,
                    title: 'Justice',
                    description:
                      'We fight for legal accountability and systemic change to protect the rights of children worldwide.',
                  },
                ].map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <item.icon className="size-10 text-brand-blue-500" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-lg overflow-hidden h-[300px]  self-center w-[400px] md:flex-grow md:h-[700px] md:mt-auto ">
              <Image
                src={
                  'https://marianco-images.s3.eu-north-1.amazonaws.com/mission_8681071fe5.png'
                }
                fill
                alt="children standing together"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="pb-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="mb-6">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated professionals working tirelessly to make our
              mission a reality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={
                      member.image?.formats?.medium?.url ??
                      member.image.url ??
                      ''
                    }
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-brand-blue-900 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
          <CtaSection
            heading="Join Our Mission"
            description="Want to be part of our journey? We're always looking for talented individuals to help us grow and make a greater impact."
            link={{
              text: 'Join Our Great Team',
              href: ROUTES.GET_INVOLVED,
            }}
          />
        </div>
      </section>
    </div>
  )
}
