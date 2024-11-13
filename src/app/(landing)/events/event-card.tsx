'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { EventInfo } from './page'

export default function EventCard({
  event,
  index,
}: {
  event: EventInfo
  index: number
}) {
  return (
    <motion.li
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          {
            'lg:flex-row-reverse': index % 2 !== 0,
          },
          'lg:flex max-w-[500px] mx-auto lg:max-w-none '
        )}
      >
        <CardHeader className="h-64 w-full lg:h-auto lg:flex-1">
          <div
            className="relative rounded-lg overflow-hidden h-full 
           "
          >
            <Image
              src={event.attributes.imageUrl}
              alt={event.attributes.title}
              objectFit="cover"
              // className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent className="lg:py-12 lg:max-w-[450px] text-pretty">
          <CardTitle className="mb-4">{event.attributes.title}</CardTitle>
          {/* <p>{event.attributes.description}</p> */}
          <p className="mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi,
            neque possimus iure laborum ea perspiciatis. Officiis, fugit neque.
            Enim quisquam, ipsum temporibus expedita ipsa vel ad doloremque
            magni sit dicta excepturi incidunt esse necessitatibus mollitia
            libero deleniti. Nihil, minus culpa.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="size-4" />
              2024/12/31
              {/* {format(new Date(event.attributes.date), 'MMMM d, yyyy')} */}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icons.clock className="size-4" />
              {event.attributes.time}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icons.mapPin className="size-4" />
              {event.attributes.location}
            </div>
          </div>

          <Button className="w-full mt-8">Register Now</Button>
        </CardContent>
      </Card>
    </motion.li>
  )
}
