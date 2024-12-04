'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'

const ArticleRenderer = ({ content }: { content: BlocksContent }) => {
  return <BlocksRenderer content={content} />
}

export default ArticleRenderer
