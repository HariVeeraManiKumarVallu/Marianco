'use client'
import { Icons } from '@/components/icons'
import { motion } from 'framer-motion'
import { BicepsFlexed, Crown, Scale } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <div className="space-y-20">
      <h1 className="container mt-48">About Us</h1>
      <section className="container">
        <h2>Our Story</h2>
        <p className="mb-8">
          Marianco is a non-profit organization founded by Francisco Padilla, a
          former street orphan from Cartagena, Colombia. His biological mother,
          Maria, was a child prostitute living in the Cartagena slums. We are
          dedicated to combating child trafficking, child prostitution, and
          child pornography. We care for all children and provide even extra
          careful support for children under the age of 15.
        </p>
        <p>
          With a deep personal connection to our mission, we strive to provide
          safety, support, and hope to children in need. The Marianco team is on
          a mission to eradicate the sexual exploitation of young children. Our
          organization was founded by individuals who could not stand by while
          children across the world continued to suffer from the horrors of
          trafficking, exploitation, and abuse. Through targeted interventions,
          powerful advocacy, and hands-on support, Marianco seeks to protect the
          most vulnerable children, ensuring they have a safe space to grow,
          thrive, and reclaim their lives.
        </p>
      </section>
      {/* <section className="container">
        <h2>Our Mission</h2>
        <h3>Mission</h3>
        <p>
          Marianco is committed to creating a world where every child can live
          free from sexual exploitation, human trafficking, and abuse. We
          believe in empowering children, supporting their emotional recovery,
          and providing them with the tools they need to build their future.
        </p>
        <h3>Vision</h3>
        <p>
          A future where no child has to fear for their safety, and every
          community takes a proactive role in safeguarding its children. We
          envision a world where awareness, action, and compassion eradicate
          child exploitation.
        </p>
        <h3>Core Values</h3>
        <ul>
          <li>
            <h4>Protection:</h4>
            <p>
              {' '}
              Every child deserves to feel safe, and we work tirelessly to
              provide environments where they can be free from harm.
            </p>
          </li>
          <li>
            <h4>Dignity:</h4>
            <p>
              {' '}
              We treat every individual, especially children, with the respect
              and dignity they deserve.
            </p>
          </li>
          <li>
            <h4>Empowerment:</h4>
            <p>
              {' '}
              We empower children and communities with the resources, support,
              and knowledge needed to combat exploitation.
            </p>
          </li>
          <li>
            <h4>Justice:</h4>
            <p>
              {' '}
              We fight for legal accountability and systemic change to protect
              the rights of children worldwide.
            </p>
          </li>
        </ul>
      </section> */}

      {/* Our Mission */}
      <section className="py-20 bg-secondary">
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
                    <item.icon className="size-10 text-green-500" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-lg overflow-hidden h-[300px] md:h-auto md:flex-grow">
              <Image
                src={'/mission.png'}
                fill
                alt="children standing together"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section>
        <div className="container">
          {/* <h3>Our Team</h3>
          <p>
          Behind Marianco is a team of passionate advocates, lawyers, social
          workers, psychologists, and volunteers who dedicate their time to
          protecting and uplifting children affected by exploitation. Our
            diverse team works across sectors to bring lasting change and
            justice to every child we serve.
          </p> */}

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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Executive Director',
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
                bio: '20+ years experience in child protection and nonprofit leadership',
              },
              {
                name: 'Michael Chen',
                role: 'Operations Director',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
                bio: 'Expert in program development and community outreach',
              },
              {
                name: 'Dr. Emily Martinez',
                role: 'Head of Rehabilitation',
                image:
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3',
                bio: 'Specialist in trauma-informed care and child psychology',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-red-500 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="container">
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
      </section> */}
    </div>
  )
}
