import { stock, STOCK } from './images'

export type PortfolioCategory =
  | 'weddings'
  | 'prenup'
  | 'birthdays'
  | 'debut'
  | 'graduations'
  | 'aerial'
  | 'other'

export const portfolioCategories: { id: 'all' | PortfolioCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'prenup', label: 'Prenup' },
  { id: 'birthdays', label: 'Birthdays' },
  { id: 'debut', label: 'Debut' },
  { id: 'graduations', label: 'Graduations' },
  { id: 'aerial', label: 'Aerial / Drone' },
  { id: 'other', label: 'Other Events' },
]

export interface PortfolioItem {
  id: string
  type: 'photo' | 'video'
  category: PortfolioCategory
  title: string
  alt: string
  /** Photo: the image. Video: the thumbnail/poster image. */
  src: string
  /** Video only: file path (e.g. "/videos/weddings/highlight.mp4") or a direct .mp4 URL. */
  videoSrc?: string
  /** Controls the masonry tile shape. */
  shape: 'portrait' | 'landscape' | 'square' | 'tall'
}

/**
 * ADD / REMOVE / REPLACE work here only.
 * Local files: put in /public/images/<folder>/ and use "/images/<folder>/file.jpg".
 * To add a video: { type: 'video', src: <poster image>, videoSrc: '/videos/highlights/clip.mp4', ... }
 */
export const portfolio: PortfolioItem[] = [
  { id: 'w1', type: 'photo', category: 'weddings', title: 'Vows at golden hour', alt: 'Couple at golden hour (placeholder photo)', src: stock(STOCK.wedding[0], 1000), shape: 'portrait' },
  { id: 'w2', type: 'photo', category: 'weddings', title: 'The first dance', alt: 'Wedding celebration (placeholder photo)', src: stock(STOCK.wedding[1], 1000), shape: 'landscape' },
  { id: 'w3', type: 'photo', category: 'weddings', title: 'Together', alt: 'Newlyweds portrait (placeholder photo)', src: stock(STOCK.wedding[2], 1000), shape: 'tall' },
  { id: 'w4', type: 'photo', category: 'weddings', title: 'Details', alt: 'Wedding details (placeholder photo)', src: stock(STOCK.wedding[3], 1000), shape: 'square' },
  { id: 'v1', type: 'video', category: 'weddings', title: 'Wedding Highlight Film', alt: 'Wedding highlight video', src: stock(STOCK.wedding[0], 1000), videoSrc: 'https://www.facebook.com/reel/1225827869488360/', shape: 'landscape' },
  { id: 'p1', type: 'photo', category: 'prenup', title: 'Golden light session', alt: 'Prenup session (placeholder photo)', src: stock(STOCK.prenup[0], 1000), shape: 'portrait' },
  { id: 'p2', type: 'photo', category: 'prenup', title: 'Love story', alt: 'Prenup portrait (placeholder photo)', src: stock(STOCK.prenup[1], 1000), shape: 'landscape' },
  { id: 'b1', type: 'photo', category: 'birthdays', title: 'Celebration', alt: 'Birthday celebration (placeholder photo)', src: stock(STOCK.birthday[0], 1000), shape: 'square' },
  { id: 'b2', type: 'photo', category: 'birthdays', title: 'Party moments', alt: 'Party moments (placeholder photo)', src: stock(STOCK.birthday[1], 1000), shape: 'portrait' },
  { id: 'b-v1', type: 'video', category: 'birthdays', title: 'Thea — Birthday SDE', alt: 'Thea birthday highlight film', src: '/images/birthdays/thea-sde-cover.jpg', videoSrc: '/videos/birthdays/thea sde.mp4', shape: 'landscape' },
  { id: 'd1', type: 'photo', category: 'debut', title: 'An evening to remember', alt: 'Debut celebration (placeholder photo)', src: stock(STOCK.debut[0], 1000), shape: 'landscape' },
  { id: 'd2', type: 'photo', category: 'debut', title: 'Eighteen', alt: 'Debut portrait (placeholder photo)', src: stock(STOCK.debut[1], 1000), shape: 'tall' },
  { id: 'g1', type: 'photo', category: 'graduations', title: 'Graduation day', alt: 'Graduation (placeholder photo)', src: stock(STOCK.graduation[0], 1000), shape: 'portrait' },
  { id: 'a1', type: 'photo', category: 'aerial', title: 'Coastal venue from above', alt: 'Aerial drone view of coastal venue (placeholder photo)', src: stock(STOCK.aerial[0], 1000), shape: 'landscape' },
  { id: 'a2', type: 'video', category: 'aerial', title: 'Aerial Cinematic Reel', alt: 'Aerial drone highlight film', src: stock(STOCK.aerial[1], 1000), videoSrc: '', shape: 'landscape' },
  { id: 'o1', type: 'photo', category: 'other', title: 'Christening', alt: 'Family celebration (placeholder photo)', src: stock(STOCK.baptism[0], 1000), shape: 'square' },
]
