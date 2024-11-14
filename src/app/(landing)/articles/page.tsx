'use client'

import NewsletterSignup from '@/components/forms/newsletter-signup'
import TitleSection from '@/components/title-section'
import { buttonVariants } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const featuredArticles = [
  {
    id: 1,
    title:
      'Breaking the Cycle: A Comprehensive Approach to Fighting Child Trafficking',
    description:
      'An in-depth look at how integrated approaches combining prevention, intervention, and rehabilitation are making a real difference in the fight against child trafficking.',
    date: '2024-01-20',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3',
    category: 'Featured',
  },
  {
    id: 2,
    title: "Technology's Role in Preventing Child Trafficking",
    description:
      'How modern technology is being leveraged to protect vulnerable children.',
    date: '2024-01-18',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Community-Led Solutions in Child Protection',
    description:
      'Exploring successful community initiatives that are making a difference.',
    date: '2024-01-15',
    image:
      'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3',
    category: 'Community',
  },
]

const recentArticles = [
  {
    id: 4,
    title: 'Education as Prevention: Building Awareness',
    description:
      'How educational programs are helping prevent child trafficking.',
    date: '2024-01-12',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3',
    category: 'Education',
  },
  {
    id: 5,
    title: 'Global Partnerships in Child Protection',
    description:
      'The importance of international cooperation in fighting trafficking.',
    date: '2024-01-10',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3',
    category: 'Partnership',
  },
  {
    id: 6,
    title: 'Rehabilitation Success Stories',
    description:
      'Real stories of recovery and hope from our rehabilitation programs.',
    date: '2024-01-08',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3',
    category: 'Impact',
  },
  {
    id: 7,
    title: 'Policy Changes Making a Difference',
    description:
      'Recent policy developments that are strengthening child protection.',
    date: '2024-01-05',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3',
    category: 'Policy',
  },
]

export default function Page() {
  return (
    <div className="space-y-20">
      <TitleSection
        title="Latest Articles"
        description="Stay informed about our work and the latest developments in child protection."
        image={{ url: '/titleImg.png', altText: 'altText' }}
      >
        <div>
          <Link
            href="#newsletter"
            className={buttonVariants({ className: 'mt-4' })}
          >
            Subscribe to our newsletter
          </Link>
        </div>
      </TitleSection>

      {/* Featured Articles */}

      <section>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Main Featured Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:row-span-2"
            >
              <Link
                href={`/articles/${featuredArticles[0].id}`}
                className="group"
              >
                <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
                  <Image
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                      {featuredArticles[0].category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                      {featuredArticles[0].title}
                    </h2>
                    <p className="text-white/80 mb-4">
                      {featuredArticles[0].description}
                    </p>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {/* {format(
                        new Date(featuredArticles[0].date),
                        'MMMM d, yyyy'
                      )} */}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* Secondary Featured Articles */}
            <div className="grid gap-8">
              {featuredArticles.slice(1).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/articles/${article.id}`} className="group">
                    <div className="relative h-[280px] rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      <div className="absolute bottom-0 p-6 text-white">
                        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                          {article.category}
                        </span>
                        <h2 className="text-xl font-bold mb-2">
                          {article.title}
                        </h2>
                        <p className="text-white/80 mb-4">
                          {article.description}
                        </p>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {/* {format(new Date(article.date), 'MMMM d, yyyy')} */}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {recentArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <Link href={`/articles/${article.id}`} className="group">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {/* {format(new Date(article.date), 'MMMM d, yyyy')} */}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  )
}
