'use client'

import { usePathname } from 'next/navigation'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share'

interface ShareButtonProps {
  title: string
  className?: string
  summary?: string
  imageUrl?: string
}

export function ShareButtons({
  title,
  className,
  summary = '',
  imageUrl = '',
}: ShareButtonProps) {
  const pathname = usePathname()
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`

  return (
    <div className="flex gap-4">
      <FacebookShareButton url={url} hashtag={'#Marianco'}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        summary={summary}
        source={process.env.NEXT_PUBLIC_APP_URL}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}
