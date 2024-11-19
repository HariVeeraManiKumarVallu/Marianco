import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[isArchived][$eq]=false&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_PROD_TOKEN}`,
        },
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
