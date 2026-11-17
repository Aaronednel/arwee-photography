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
    id: 't1',
    name: 'Sample Client One',
    eventType: 'Wedding',
    feedback: '[Sample testimonial — replace with real client feedback. Describe the experience, the team, and the final photos and film.]',
    isSample: true,
  },
  {
    id: 't2',
    name: 'Sample Client Two',
    eventType: 'Birthday',
    feedback: '[Sample testimonial — replace with real client feedback. Describe the experience, the team, and the final photos and film.]',
    isSample: true,
  },
  {
    id: 't3',
    name: 'Sample Client Three',
    eventType: 'Debut',
    feedback: '[Sample testimonial — replace with real client feedback. Describe the experience, the team, and the final photos and film.]',
    isSample: true,
  },
]
