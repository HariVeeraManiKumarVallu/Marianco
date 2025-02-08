import { STATIC_CONFIG } from "@/constants/cache"
import { Sponsor } from "@/types/donation"
import { StrapiResponse } from "@/types/strapi"

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

  if (!res.ok) {
    throw new Error('Failed to fetch sponsors')
  }

  const data = await res.json()
  return data as StrapiResponse<Sponsor[]>
}
