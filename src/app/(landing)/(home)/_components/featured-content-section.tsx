'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { ArticleData } from '@/types/article'
import { EventData } from '@/types/event'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedContentSection({
  featuredArticles,
  events,
}: {
  featuredArticles: ArticleData[]
  events: EventData[]
}) {
  return (
    <section className="bg-beige py-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Articles & Events</h2>
          <p className="text-xl text-muted-foreground max-w-prose">
            Explore our latest articles and upcoming events to learn more about
            our work and how you can get involved.
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Articles Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-12"
            >
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-3xl font-bold mb-4">Featured Articles</h3>
                <p className="text-lg text-muted-foreground">
                  Discover our latest insights, research, and stories about
                  protecting children and creating lasting change.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredArticles.slice(0, 3).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`${ROUTES.ARTICLES}/${article.slug}`}
                    className="block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(article.publishedDate))}
                      </p>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="pt-2 flex items-center text-primary font-medium">
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href={ROUTES.ARTICLES}>View All Articles</Link>
              </Button>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-3xl font-bold mb-4">Upcoming Events</h3>
                <p className="text-lg text-muted-foreground max-w-prose">
                  Join us in making a difference. Participate in our upcoming
                  events and initiatives.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {events.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`${ROUTES.EVENTS}/${event.slug}`}
                    className="block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image.url}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(new Date(event.date))} at {event.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {event.summary}
                      </p>
                      <div className="pt-2 flex items-center text-primary font-medium">
                        View Event
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href={ROUTES.EVENTS}>View All Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
