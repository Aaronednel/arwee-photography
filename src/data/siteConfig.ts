import { stock, STOCK } from './images'

/**
 * Central site configuration. Edit values here — no component changes needed.
 * Contact fields left as empty strings are shown as "To be provided" and never rendered as links.
 */
export const siteConfig = {
  brand: {
    name: 'ARWEE',
    subtitle: 'PHOTOGRAPHY & FILMS',
    fullName: 'ARWEE PHOTOGRAPHY & FILMS',
    tagline: 'Every Frame Tells a Story.',
    supporting: 'Capturing Moments. Creating Memories.',
    /** Optional: set to an image path (e.g. "/images/logo.png") to replace the text logo. */
    logoImage: '' as string,
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Quotation', href: '#quotation' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    image: stock(STOCK.hero, 2000),
    imageAlt: 'A couple sharing a quiet moment on their wedding day',
    label: 'ARWEE PHOTOGRAPHY & FILMS',
    headline: 'Every Frame Tells a Story.',
    description:
      "Professional Photography & Videography for Weddings, Birthdays, Debuts, and Life's Most Meaningful Moments.",
    /** Optional looping hero video (e.g. "/videos/highlights/hero.mp4"). Leave '' to use the image. */
    video: '',
  },

  about: {
    image: stock(STOCK.about, 1200),
    imageAlt: 'Wedding details captured by Arwee Photography & Films',
    label: 'ABOUT US',
    heading: 'We Capture More Than Just Moments.',
    paragraphs: [
      'At Arwee Photography & Films, we believe every moment deserves to be remembered. Through creative photography and cinematic storytelling, we capture genuine emotions, meaningful experiences, and unforgettable celebrations.',
      'From intimate gatherings to grand celebrations, our approach is simple: be present, stay unobtrusive, and tell your story honestly — frame by frame.',
    ],
  },

  contact: {
    email: 'arweefilm@gmail.com',
    phone: '+63 906 834 5098',
    facebook: 'https://www.facebook.com/wheem1',
    facebookName: 'David Whee', 
    location: 'San Fernando, Pampanga',
  },

  /** Backend wiring lives in /src/utils/inquiry.ts. Values come from .env (see .env.example). */
  copyright: 'Arwee Photography & Films',
}

export type SiteConfig = typeof siteConfig
