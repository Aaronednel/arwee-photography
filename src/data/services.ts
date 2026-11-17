import { stock, STOCK } from './images'

export interface Service {
  id: string
  title: string
  description: string
  image: string
  /** Must match a value in eventTypes — used to pre-fill the inquiry form. */
  eventType: EventType
}

export const eventTypes = [
  'Wedding',
  'Prenup',
  'Birthday',
  'Debut',
  'Graduation',
  'Baptism / Christening',
  'Other',
] as const
export type EventType = (typeof eventTypes)[number]

export const services: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography & Videography',
    description: 'From the first look to the last dance — your day told with honest, timeless imagery.',
    image: stock(STOCK.wedding[1], 900),
    eventType: 'Wedding',
  },
  {
    id: 'prenup',
    title: 'Prenup Photography',
    description: 'Relaxed, romantic sessions that capture the two of you before the big day.',
    image: stock(STOCK.prenup[0], 900),
    eventType: 'Prenup',
  },
  {
    id: 'birthday',
    title: 'Birthday Photography & Videography',
    description: 'Joyful candid moments, from the little details to the loudest cheers.',
    image: stock(STOCK.birthday[0], 900),
    eventType: 'Birthday',
  },
  {
    id: 'debut',
    title: 'Debut Photography & Videography',
    description: 'An elegant coverage of a milestone evening, made to be treasured.',
    image: stock(STOCK.debut[0], 900),
    eventType: 'Debut',
  },
  {
    id: 'graduation',
    title: 'Graduation Photography',
    description: 'Celebrate achievement with portraits and moments that mark the milestone.',
    image: stock(STOCK.graduation[0], 900),
    eventType: 'Graduation',
  },
  {
    id: 'baptism',
    title: 'Baptism & Christening',
    description: 'Gentle, heartfelt coverage of a meaningful day for the whole family.',
    image: stock(STOCK.baptism[0], 900),
    eventType: 'Baptism / Christening',
  },
  {
    id: 'other',
    title: 'Other Special Events',
    description: 'Anniversaries, reunions, and every occasion in between — just tell us your story.',
    image: stock(STOCK.debut[1], 900),
    eventType: 'Other',
  },
]
