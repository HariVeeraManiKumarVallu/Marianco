import AnimatedWorldMap from '@/components/animated-world-map'
import { motion } from 'framer-motion'

export default function StatsSection() {
  return (
    <section>
      <div className="container  py-12  ">
        <h2 className=" text-center ">
          A World in Peril
          <br />
          <span className="text-2xl">
            The Alarming Reality of Child Exploitation
          </span>
        </h2>
        <div className="flex">
          <AnimatedWorldMap />
          <div className="px-8 grid place-items-center">
            <div className="">
              <h3 className="whitespace-nowrap  mb-6">Alarming Numbers</h3>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {[
                  {
                    title: '1.2 million',
                    description: 'Children trafficked annually',
                  },
                  {
                    title: '2 million',
                    description: 'Children in commercial sex trade',
                  },
                  {
                    title: '70%',
                    description: 'Child trafficking victims are girls',
                  },
                  {
                    title: '69 million',
                    description: 'Reports of abuse images annually',
                  },
                ].map(({ title, description }) => (
                  <li key={title} className="space-y-2 ">
                    <h4 className="text-red-600">{title}</h4>
                    <p className="text-zinc-600 text-sm">{description}</p>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
