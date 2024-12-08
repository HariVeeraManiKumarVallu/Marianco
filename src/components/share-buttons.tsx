'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'

interface ShareButtonProps {
  title: string
  summary?: string
  className?: string
}

export function ShareButtons({
  title,
  summary = '',
  className,
}: ShareButtonProps) {
  const pathname = usePathname()
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className={cn('flex gap-2', className)}>
          <Share2 className="size-4" />
          <span>Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <FacebookShareButton
            url={url}
            hashtag={'#Marianco'}
            className="w-full"
          >
            <div className="flex items-center">
              <FacebookIcon size={32} round />
              <span className="ml-2">Facebook</span>
            </div>
          </FacebookShareButton>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LinkedinShareButton
            url={url}
            title={title}
            summary={summary}
            source={process.env.NEXT_PUBLIC_APP_URL}
            className="w-full"
          >
            <div className="flex items-center">
              <LinkedinIcon size={20} round />
              <span className="ml-2">LinkedIn</span>
            </div>
          </LinkedinShareButton>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <TwitterShareButton
            url={url}
            title={title}
            hashtags={['#Marianco']}
            className="w-full"
          >
            <div className="flex items-center">
              <XIcon size={20} round />
              <span className="ml-2">X</span>
            </div>
          </TwitterShareButton>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <WhatsappShareButton url={url} title={title} className="w-full">
            <div className="flex items-center">
              <WhatsappIcon size={20} round />
              <span className="ml-2">WhatsApp</span>
            </div>
          </WhatsappShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
