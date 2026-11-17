import { z } from 'zod'

export const inquirySchema = z
  .object({
    fullName: z.string().trim().min(2, 'Please enter your full name.').max(100),
    phone: z
      .string()
      .trim()
      .min(1, 'Contact number is required.')
      .regex(/^[+()\-\s\d]{7,20}$/, 'Please enter a valid contact number.'),
    email: z.string().trim().min(1, 'Email address is required.').pipe(z.email('Please enter a valid email address.')),
    eventType: z.string().trim().min(1, 'Please select an event type.'),
    eventDate: z
      .string()
      .min(1, 'Please select the event date.')
      .refine((v) => {
        const d = new Date(v + 'T00:00:00')
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return !Number.isNaN(d.getTime()) && d >= today
      }, 'Event date cannot be in the past.'),
    location: z.string().trim().min(2, 'Please enter the event location or venue.').max(200),
    estimatedBudget: z.string().trim().min(1, 'Please select an estimated budget.'),
    customBudget: z.string().trim().max(100).optional(),
    coverage: z.array(z.string()).min(1, 'Please select at least one coverage preference.'),
    message: z.string().trim().max(1500, 'Message is too long (max 1500 characters).').optional(),
    /** Honeypot — real users never fill this. */
    website: z.string().max(0).optional(),
  })
  .refine(
    (data) => data.estimatedBudget !== 'Custom Budget' || (data.customBudget && data.customBudget.trim().length > 0),
    {
      message: 'Please enter your custom budget amount.',
      path: ['customBudget'],
    },
  )

export type InquiryValues = z.infer<typeof inquirySchema>

export class InquiryNotConfiguredError extends Error {
  constructor() {
    super('Inquiry service is not configured.')
    this.name = 'InquiryNotConfiguredError'
  }
}

/**
 * ───────────────────────── BACKEND INTEGRATION POINT ─────────────────────────
 * Configure ONE or BOTH of the following in `.env` (see .env.example):
 *
 *  1) Supabase: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 *     Saves each inquiry to the `inquiries` table.
 *
 *  2) Email / JSON endpoint (Formsubmit, Formspree, etc.): VITE_INQUIRY_ENDPOINT
 *     Sends an email notification with all event details.
 *
 * Nothing configured → throws InquiryNotConfiguredError and the UI says so honestly.
 */
export async function submitInquiry(values: InquiryValues): Promise<void> {
  const { website, customBudget, ...v } = values
  if (website) return // honeypot tripped: silently drop

  const finalBudget =
    v.estimatedBudget === 'Custom Budget' && customBudget
      ? `Custom: ${customBudget}`
      : v.estimatedBudget

  const coverageSummary = v.coverage.join(', ')

  const env = import.meta.env
  const supabaseUrl = env.VITE_SUPABASE_URL as string | undefined
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY as string | undefined
  const endpoint = env.VITE_INQUIRY_ENDPOINT as string | undefined

  if (!(supabaseUrl && supabaseKey) && !endpoint) {
    throw new InquiryNotConfiguredError()
  }

  const tasks: Promise<void>[] = []

  if (supabaseUrl && supabaseKey) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Prefer: 'return=minimal',
    }
    if (!supabaseKey.startsWith('sb_publishable_')) {
      headers.Authorization = `Bearer ${supabaseKey}`
    }

    tasks.push(
      fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/inquiries`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          full_name: v.fullName,
          email: v.email,
          phone: v.phone,
          event_type: v.eventType,
          event_date: v.eventDate,
          location: v.location,
          preferred_package: `${coverageSummary} | Budget: ${finalBudget}`,
          message: v.message || null,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(`Supabase responded ${res.status}`)
      }),
    )
  }

  if (endpoint) {
    tasks.push(
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Quote Request: ${v.eventType} — ${v.fullName}`,
          fullName: v.fullName,
          phone: v.phone,
          email: v.email,
          eventType: v.eventType,
          eventDate: v.eventDate,
          location: v.location,
          estimatedBudget: finalBudget,
          preferredCoverage: coverageSummary,
          message: v.message || 'None',
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(`Email endpoint responded ${res.status}`)
      }),
    )
  }

  await Promise.all(tasks)
}
