'use client'

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'next-share'
import { usePathname } from 'next/navigation'

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
      <FacebookShareButton url={url} quote={title} hashtag={'#Marianco'}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton url={url} blankTarget>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}
