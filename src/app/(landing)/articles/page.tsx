import NewsletterSignup from '@/components/forms/newsletter-signup'
import TitleSection from '@/components/title-section'
import { buttonVariants } from '@/components/ui/button'
import { ArticleResponse } from '@/types/article'
import Link from 'next/link'
import FeaturedArticles from './featured-articles'
import RecentArticles from './recent-articles'

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
    slug: 'education-as-prevention',
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
    thumbnailUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3',
    category: 'Policy',
  },
]

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[isFeatured][$eq]=true`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  )

  const data: ArticleResponse = await res.json()
  console.log(data)
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
      <Link href={`/articles/${data.data[0].slug}`}> TEST LINK</Link>

      <FeaturedArticles featuredArticles={featuredArticles} />

      <RecentArticles recentArticles={recentArticles} />

      <NewsletterSignup />
    </div>
  )
}
