import { motion } from 'framer-motion'
import { BicepsFlexed, GraduationCap, Shield } from 'lucide-react'

export default function AboutSection() {
  return (
    <section>
      <div className="container space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>About Us</h2>
          <p>
            Marianco is a global nonprofit organization dedicated to protecting
            children from the horrors of trafficking, exploitation and abuse.
            Founded by Francisco PAdilla, a former street orphan from Cartagena,
            Colombia, Marianco is committed to safeguarding the rights of
            children and ensuring they have a future full of hope and
            opportunities. We believe that every child deserves to grow up in a
            world where they are protected, valued, and empowered to reach their
            full potential.
          </p>
        </motion.div>

        <ul className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: 'Protection',
              description:
                'We work to prevent child trafficking through education and community awareness programs.',
            },
            {
              icon: GraduationCap,
              title: 'Education',
              description:
                'Organizing educational workshops, scholarships, and mentoring programs to help individuals grow.',
            },
            {
              icon: BicepsFlexed,
              title: 'Empowerment',
              description:
                'Fostering economic independence by providing skills training and community support.',
            },
          ].map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-card"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="">{item.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
