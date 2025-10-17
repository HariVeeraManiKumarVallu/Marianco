import { getSponsors } from '@/lib/queries/strapi/sponsor'
import Image from 'next/image'

type Sponsor = {
  name: string;
  url: string;
  logo: { url: string; height: number; width: number }[];
};

export default async function SponsorsList() {

  const sponsors: Sponsor[] = await getSponsors()

  if (!sponsors || sponsors.length === 0) return null

  return (
    <div className="bg-slate-100 py-section ">
      <div className="container">
        <h2 className="mb-12 lg:mb-16 text-center">Our Sponsors</h2>
        <img
          src="/images/sponsors-banner.png"
          alt="Sponsors"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          className="w-full h-auto mb-6"
        />
        <ul className="flex gap-12  items-center justify-center ">
          {sponsors.map((sponsor) => (
            <li key={sponsor.name}>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${sponsor.name} website`}
              >
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
