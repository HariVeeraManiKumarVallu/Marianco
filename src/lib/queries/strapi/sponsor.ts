import { STATIC_CONFIG } from "@/constants/cache"
import { StrapiImage, StrapiResponse } from "@/types/strapi"

type Sponsor = {
  name: string,
  url: string,
  logo: StrapiImage[]
}

export async function getSponsors() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/sponsors?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

console.log("Get Sponsors response:",res);

  if (!res.ok) {
    throw new Error('Failed to fetch sponsors')
  }

  const data: StrapiResponse<Sponsor[]> = await res.json()
  return data.data
}
