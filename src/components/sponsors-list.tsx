import Image from 'next/image'
const sponsors = [
  {
    name: 'Gaddr',
    href: 'https://gaddr.com',
    image:
      'https://marianco-images.s3.eu-north-1.amazonaws.com/Gaddr_Logo_Angle_Purple_ac40b1e9ba.png',
  },
  {
    name: 'Flower Work',
    href: 'https://flowerwork.com',
    image:
      'https://marianco-images.s3.eu-north-1.amazonaws.com/flower_work_logo_dark_da018fff3c.png',
  },
  {
    name: 'Daylited',
    href: 'https://daylited.com',
    image:
      'https://marianco-images.s3.eu-north-1.amazonaws.com/Daylited_logo_3dcf16f6be.png',
  },
]

export default function SponsorsList() {
  return (
    <div className="bg-stone-100 p-12 ">
      <div className="container">
        <h2 className="mb-8 text-center">Our Sponsors</h2>
        <ul className="flex gap-20  items-center justify-center">
          {sponsors.map(sponsor => (
            <li key={sponsor.name}>
              <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  height={200}
                  width={200}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
