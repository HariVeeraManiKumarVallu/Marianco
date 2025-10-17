import React from 'react'
import { getTeamMembers } from '@/lib/queries/strapi/team-members'

export const metadata = { title: 'About Us' }

export default async function AboutUsPage() {
  const members = await getTeamMembers()
  const list = Array.isArray(members) ? members : []

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold mb-8">About Us</h1>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full">
            Team profiles coming soon.
          </p>
        )}
        {list.map(m => {
          const a: any = m.attributes || {}
          const imgData = a.image?.data
          const imgUrl =
            imgData?.attributes?.url &&
            (imgData.attributes.url.startsWith('http')
              ? imgData.attributes.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, '')}${imgData.attributes.url}`)

          return (
            <article
              key={m.id}
              className="border rounded p-4 flex flex-col gap-3"
            >
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={a.name}
                  className="w-32 h-32 object-cover rounded-full border"
                  loading="lazy"
                />
              )}
              <div>
                <h2 className="font-medium">{a.name}</h2>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {a.role}
                </p>
              </div>
              {a.bio && (
                <p className="text-sm leading-relaxed">{a.bio}</p>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}
