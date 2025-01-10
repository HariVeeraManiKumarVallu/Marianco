'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'

export default function ContentRenderer({ content }: { content: BlocksContent }) {
  return <BlocksRenderer content={content} blocks={{
    link: ({ children, url }) => {
      if (url.includes('https://marianco.org') || url.includes('www.marianco.org')) return <Link href={url}>{children}</Link>
      return <a href={url} target='_blank' rel="noopener">{children}</a>
    }
  }} />
}
