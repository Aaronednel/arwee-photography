export interface Testimonial {
  id: string
  name: string
  eventType: string
  feedback: string
  /** Optional photo path, e.g. "/images/testimonials/maria.jpg" */
  photo?: string
  /** Set false when replaced with real client feedback. */
  isSample: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'John Doe',
    name: 'Nat and John',
    eventType: 'Wedding',
    feedback: 'Thank you so much, Arwee Photography & Films, for capturing our wedding day so beautifully. The team made us feel completely comfortable, and the photos and SDE film brought back every emotion.',
    isSample: false,
  },
  {
    id: 'Aaron Enriquez',
    name: 'Aaron 26th Birthday',
    eventType: 'Birthday',
    feedback: 'We are so grateful for how well you covered our celebration! You captured every candid smile and family moment, and the highlight video was something we will treasure forever.',
    isSample: false,
  },
  {
    id: 'Trixie',
    name: 'Kristine Gonzales',
    eventType: 'Debut',
    feedback: 'Super professional, easy to work with, and very creative. Every shot from the pre-debut to the reception turned out timeless and elegant. Highly recommended!',
    isSample: false,
  },
]
