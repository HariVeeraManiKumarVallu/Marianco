import { unstable_noStore as noStore } from 'next/cache'

/**
 * Dynamic route segment config for Next.js
 * Controls caching and rendering behavior
 */
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// Disable caching for dynamic routes
export function withoutCache() {
  noStore()
}

// Dynamic routes configuration
export const dynamicConfig = {
  revalidate: 0,
  dynamic: 'force-dynamic',
}

// Static routes configuration
export const staticConfig = {
  revalidate: 3600, // Revalidate every hour
  dynamic: 'force-static',
}

// ISR routes configuration
export const isrConfig = {
  revalidate: 60, // Revalidate every minute
  dynamic: 'force-dynamic',
}

// Test configuration for development
export const testConfig = {
  revalidate: 0,  // No revalidation needed with force-dynamic
  dynamic: 'force-dynamic'  // Always fetch fresh data in development
}
