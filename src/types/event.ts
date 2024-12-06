import { BlocksContent } from '@strapi/blocks-react-renderer'
import { StrapiData, StrapiImage, StrapiResponse } from './strapi'

export type Event = {
  title: string
  summary: string
  date: string
  time: string
  location: string
  isPastEvent: boolean
  content: BlocksContent
  slug: string
  // summary: string
  image: StrapiImage
  // isArchived: boolean
}

export type EventData = StrapiData<Event>
export type EventResponse = StrapiResponse<EventData>
