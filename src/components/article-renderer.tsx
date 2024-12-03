'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'

const ArticleRenderer = ({
  content,
}: // article,
{
  content: BlocksContent
  // article: ArticleData
}) => {
  return <BlocksRenderer content={content} />
}

export default ArticleRenderer
