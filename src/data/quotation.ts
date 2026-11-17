export const quotationEventTypes = [
  'Wedding',
  'Prenup',
  'Birthday',
  'Debut',
  'Corporate Events',
  'Other Special Events',
] as const

export type QuotationEventType = (typeof quotationEventTypes)[number]

export const budgetRanges = [
  'Below ₱5,000',
  '₱5,000 – ₱10,000',
  '₱10,000 – ₱20,000',
  '₱20,000 – ₱30,000',
  '₱30,000 and above',
  'Custom Budget',
] as const

export type BudgetRange = (typeof budgetRanges)[number]

export interface CoverageOption {
  id: string
  label: string
  note?: string
}

export const coverageOptions: CoverageOption[] = [
  { id: 'photography', label: 'Photography' },
  { id: 'videography', label: 'Videography' },
  { id: 'photo-video', label: 'Photography and Videography' },
  {
    id: 'drone',
    label: 'Drone Coverage',
    note: 'Subject to availability and location restrictions',
  },
]
