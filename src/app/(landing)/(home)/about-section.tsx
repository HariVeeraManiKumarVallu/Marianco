import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-8"
      >
        <h2>About Us</h2>
        <p className="pb-2 border-b-2">
          Marianco is a global nonprofit organization dedicated to protecting
          children from the horrors of trafficking, exploitation and abuse.
          Founded by Francisco Padilla, a former street orphan from Cartagena,
          Colombia, Marianco is committed to safeguarding the rights of children
          and ensuring they have a future full of hope and opportunities. We
          believe that every child deserves to grow up in a world where they are
          protected, valued, and empowered to reach their full potential.
        </p>
        <ul className="grid lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Combatting Child Trafficking',
              description:
                'Dedicated to ending the horrific practice of child trafficking. Join us in the fight to protect vulnerable children and restore their freedom and dignity.',
              img: '/a.jpg',
              altText: '',
            },
            {
              title: 'Fighting Against Child Pornography',
              description:
                'Unwavering in our commitment to eradicating child pornography. Stand with us to protect children and eliminate this  crime.',
              img: '/b.jpg',
              altText: '',
            },
            {
              title: 'Eradicating Child Prostitution',
              description:
                'Marianco is dedicated to ending child prostitution. Stand with us to protect children and give them the future they deserve.',
              img: '/c.gif',
              altText: '',
            },
          ].map(item => (
            <li
              key={item.title}
              className="grid grid-cols-3 lg:grid-cols-1 gap-4"
            >
              <div className="relative h-[100px] w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={item.img}
                  alt={item.altText}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-2">
                <h4 className="">{item.title}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
