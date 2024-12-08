import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export function withoutCache() {
  noStore()
}

export const DYNAMIC_CONFIG = {
  revalidate: 0,
  dynamic: 'force-dynamic',
}

export const STATIC_CONFIG = {
  revalidate: 3600,
  dynamic: 'force-static',
}

export const ISR_CONFIG = {
  revalidate: 60,
  dynamic: 'force-static',
}
