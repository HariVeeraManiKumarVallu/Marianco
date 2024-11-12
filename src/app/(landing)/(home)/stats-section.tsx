import { motion } from 'framer-motion'

export default function StatsSection() {
  return (
    <section>
      <div className="container  ">
        <div className="bg-black/90  py-12 rounded-lg">
          <h2 className="mb-12 text-center text-white">
            A World in Peril
            <br />
            <span className="text-2xl">
              The Alarming Reality of Child Exploitation
            </span>
          </h2>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center max-w-[600px] mx-auto lg:max-w-none px-8"
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
                <h3 className="text-red-500">{title}</h3>
                <p className="text-zinc-400 text-sm">{description}</p>
              </li>
            ))}
            {/* <div className="space-y-2">
              <h3>1.2 million</h3>
              <p className="text-muted-foreground">
                Children trafficked annually
              </p>
            </div>

            <div className="space-y-2">
              <h3>2 million</h3>
              <p className="text-muted-foreground">
                Children in commercial sex trade
              </p>
            </div>

            <div className="space-y-2">
              <h3>70%</h3>
              <p className="text-muted-foreground">
                Child trafficking victims are girls
              </p>
            </div>
            <div className="space-y-2">
              <h3>69 million</h3>
              <p className="text-muted-foreground">
                Reports of abuse images annually
              </p>
            </div> */}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
