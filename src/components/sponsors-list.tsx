import { getSponsors } from '@/lib/queries/strapi/sponsor'
import Image from 'next/image'

export default async function SponsorsList() {

  const sponsors = await getSponsors()

  if (!sponsors || sponsors.length === 0) return null

  return (
    <div className="bg-slate-100 py-section ">
      <div className="container">
        <h2 className="mb-12 lg:mb-16 text-center">Our Sponsors</h2>
        <ul className="flex gap-12  items-center justify-center ">
          {sponsors.map(sponsor => (
            <li key={sponsor.name}>
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={sponsor.logo[0].url}
                  alt={sponsor.name}
                  height={sponsor.logo[0].height}
                  width={sponsor.logo[0].width}
                  className='object-contain h-16 w-fit'
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
