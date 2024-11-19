'use client'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'

const ArticleRenderer = ({ content }: { content: BlocksContent }) => {
  return (
    <article className="">
      <div className="prose mx-auto prose-lg ">
        <BlocksRenderer content={content} />
      </div>
    </article>
  )
}

export default ArticleRenderer
