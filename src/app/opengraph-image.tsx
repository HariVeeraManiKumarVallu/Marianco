import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Marianco - Protecting Children, Building Futures'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1e3a8a',
            marginBottom: '24px',
          }}
        >
          MARIANCO
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1e3a8a',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          Protecting Children,
          <br />
          Building Futures
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            textAlign: 'center',
            color: '#4b5563',
            maxWidth: '800px',
          }}
        >
          Creating a world where every child can grow up safe, empowered, and loved
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
