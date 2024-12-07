'use client'

import AnimatedWorldMap from '@/components/animated-world-map'
import { motion } from 'framer-motion'

export default function StatsSection() {
  return (
    <section className="py-section ">
      <div className="container  ">
        <h2 className=" text-center mb-4">
          A World in Peril
          <br />
          <span className="text-xl lg:text-2xl text-pretty">
            The Alarming Reality of Child Exploitation
          </span>
        </h2>
        <div className="xl:flex">
          <AnimatedWorldMap />
          <div className="lg:px-8 grid text-center md:place-items-center">
            <div>
              <h3 className="whitespace-nowrap   mb-6">Alarming Numbers</h3>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="gap-4 grid md:grid-cols-2 lg:grid-cols-1"
              >
                {[
                  {
                    title: '1.2 million',
                    description: 'Children trafficked annually',
                  },
                  {
                    title: '1 million',
                    description: 'Children in commercial sex trade',
                  },
                  {
                    title: '70% - 80%',
                    description: 'Child trafficking victims are girls',
                  },
                  {
                    title: '69 million',
                    description: 'Reports of abuse images annually',
                  },
                ].map(({ title, description }) => (
                  <li
                    key={title}
                    className="space-y-2 lg:text-start bg-brand-blue-300/30 p-4 rounded-lg"
                  >
                    <h4 className="text-brand-blue-900">{title}</h4>
                    <p className=" text-sm">{description}</p>
                  </li>
                ))}
                <p className="text-muted-foreground text-xs text-start max-w-prose">
                  * These numbers vary across sources, and actual figures can be
                  challenging to verify due to the hidden nature of these crimes
                </p>
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
