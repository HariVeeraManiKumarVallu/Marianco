'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FeaturedArticles from '../../articles/featured-articles'
import EventsSection from '../../events/events-sections'

export default function FeaturedContentSection() {
  return (
    <section className=" bg-beige py-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h2>Featured Articles</h2>
              <p className="text-muted-foreground">
                Discover our most impactful stories and insights on child
                protection and advocacy work.
              </p>
            </div>
            <FeaturedArticles
              featuredArticles={[]}
              className="!pt-0 !bg-transparent"
            />
            <Button variant="outline" className="w-full" asChild>
              <Link href={ROUTES.ARTICLES}>View All Articles</Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2>Upcoming Events</h2>
              <p className="text-muted-foreground">
                Join us in our mission. Discover and participate in our upcoming
                events and initiatives.
              </p>
            </div>
            <EventsSection events={[]} className="!my-0" />
            <Button variant="outline" className="w-full" asChild>
              <Link href={ROUTES.EVENTS}>View All Events</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
