'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'

const ContentRenderer = ({ content }: { content: BlocksContent }) => {
  return <BlocksRenderer content={content} />
}

export default ContentRenderer
