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

  // <article className="prose prose-lg max-w-3xl mx-auto px-4 py-8">
  //   <div dangerouslySetInnerHTML={{ __html: content }} />
  // </article>
}

export default ArticleRenderer
