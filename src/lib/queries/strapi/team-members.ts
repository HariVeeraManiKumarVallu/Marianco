export async function getTeamMembers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/team-members?sort=hierarchy&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: 1,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch team members')
  } else {
    const data = await res.json()
    return data
  }
}
