'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'

const ContentRenderer = ({ content }: { content: BlocksContent }) => {
  return <BlocksRenderer content={content} blocks={{
    link: ({ children, url }) => {
      if (url.includes('https://marianco.org') || url.includes('www.marianco.org') || !url.includes('https')) return <Link href={url}>{children}</Link>
      return <a href={url} target='_blank' rel="noopener">{children}</a>
    }
  }} />
}

export default ContentRenderer
