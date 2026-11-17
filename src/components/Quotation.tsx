import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Aperture,
  Briefcase,
  Cake,
  CalendarHeart,
  Camera,
  Check,
  CheckCircle2,
  Crown,
  Heart,
  Loader2,
  Navigation,
  Sparkles,
  Video,
} from 'lucide-react'
import {
  budgetRanges,
  coverageOptions,
  quotationEventTypes,
  type QuotationEventType,
} from '../data/quotation'
import { siteConfig } from '../data/siteConfig'
import { useInquiry } from '../hooks/useInquiry'
import {
  InquiryNotConfiguredError,
  inquirySchema,
  submitInquiry,
  type InquiryValues,
} from '../utils/inquiry'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const eventIcons: Record<QuotationEventType, typeof Heart> = {
  Wedding: Heart,
  Prenup: Sparkles,
  Birthday: Cake,
  Debut: Crown,
  'Corporate Events': Briefcase,
  'Other Special Events': CalendarHeart,
}

const coverageIcons: Record<string, typeof Camera> = {
  photography: Camera,
  videography: Video,
  'photo-video': Aperture,
  drone: Navigation,
}

const fieldClass =
  'w-full border border-charcoal/20 bg-white px-4 py-3 text-base text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-brown aria-[invalid=true]:border-red-700'

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/70"
      >
        {label} {required && <span className="text-red-700" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

export default function Quotation() {
  const { selection } = useInquiry()
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      location: '',
      estimatedBudget: '',
      customBudget: '',
      coverage: [],
      message: '',
      website: '',
    },
  })

  const selectedEvent = watch('eventType')
  const selectedBudget = watch('estimatedBudget')
  const selectedCoverage = watch('coverage') ?? []

  // Sync when user clicks "Inquire Now" on a Service card
  useEffect(() => {
    if (!selection.nonce || !selection.eventType) return
    const mapped = quotationEventTypes.includes(selection.eventType as QuotationEventType)
      ? selection.eventType
      : 'Other Special Events'
    setValue('eventType', mapped, { shouldValidate: true })
  }, [selection, setValue])

  const toggleCoverage = (label: string) => {
    const next = selectedCoverage.includes(label)
      ? selectedCoverage.filter((item) => item !== label)
      : [...selectedCoverage, label]
    setValue('coverage', next, { shouldValidate: true })
  }

  const onSubmit = async (values: InquiryValues) => {
    setStatus('submitting')
    try {
      await submitInquiry(values)
      setStatus('success')
      reset()
      requestAnimationFrame(() => {
        document.getElementById('quotation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (e) {
      setStatus(e instanceof InquiryNotConfiguredError ? 'unconfigured' : 'error')
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const err = (k: keyof InquiryValues) => errors[k]?.message as string | undefined
  const aria = (k: keyof InquiryValues) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })
  const email = siteConfig.contact.email

  return (
    <section id="quotation" className="bg-warm py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <SectionHeading
          label="INVESTMENT"
          title="Let's Create Something Special"
          description="Every event is unique, and so is the story behind it. Tell us about your event, your vision, and your estimated budget. We'll help you find the perfect photography and videography coverage for your special occasion."
        />

        <Reveal className="-mt-6 mb-14 text-center">
          <p className="font-serif text-xl italic text-brown-dark md:text-2xl">
            “Your event, your vision, your budget. We'll create the right coverage for you.”
          </p>
        </Reveal>

        {status === 'success' ? (
          <Reveal>
            <div role="status" className="border border-brown/40 bg-white p-10 text-center md:p-14">
              <CheckCircle2 className="mx-auto text-brown" size={44} strokeWidth={1.25} />
              <h3 className="mt-5 text-3xl md:text-4xl">Thank you — quote request received.</h3>
              <p className="mx-auto mt-4 max-w-lg text-charcoal/70">
                We've received your event details, coverage preferences, and estimated budget. Our team will prepare a personalized quotation and get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="link-underline mt-8 cursor-pointer text-xs font-medium uppercase tracking-[0.2em] text-brown-dark"
              >
                Submit another request
              </button>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-14">
            {/* 1. Event Selection */}
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-4">
                <div>
                  <p className="eyebrow">Step 01</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">Select Your Event</h3>
                </div>
                {err('eventType') && (
                  <p role="alert" className="text-sm text-red-700">
                    {err('eventType')}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {quotationEventTypes.map((type) => {
                  const Icon = eventIcons[type]
                  const active = selectedEvent === type
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue('eventType', type, { shouldValidate: true })}
                      aria-pressed={active}
                      className={`group flex min-h-20 cursor-pointer items-center justify-between border px-5 py-4 text-left transition-all duration-300 ${
                        active
                          ? 'border-charcoal bg-charcoal text-warm'
                          : 'border-charcoal/15 bg-white text-charcoal hover:border-brown'
                      }`}
                    >
                      <span className="flex items-center gap-3.5">
                        <Icon
                          size={20}
                          strokeWidth={1.35}
                          className={active ? 'text-brown' : 'text-brown-dark transition-transform duration-300 group-hover:scale-110'}
                          aria-hidden
                        />
                        <span className="font-serif text-xl tracking-wide">{type}</span>
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center border transition-colors ${
                          active ? 'border-brown bg-brown text-white' : 'border-charcoal/20'
                        }`}
                        aria-hidden
                      >
                        {active && <Check size={12} strokeWidth={2.5} />}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* 2. Customer Budget Selection */}
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-charcoal/10 pb-4">
                <div>
                  <p className="eyebrow">Step 02</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">What's Your Estimated Budget?</h3>
                  <p className="mt-2 text-sm text-charcoal/65">
                    Let us know your preferred budget so we can recommend coverage that suits your needs.
                  </p>
                </div>
                {err('estimatedBudget') && (
                  <p role="alert" className="text-sm text-red-700">
                    {err('estimatedBudget')}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {budgetRanges.map((range) => {
                  const active = selectedBudget === range
                  return (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        setValue('estimatedBudget', range, { shouldValidate: true })
                        if (range !== 'Custom Budget') setValue('customBudget', '')
                      }}
                      aria-pressed={active}
                      className={`flex min-h-14 cursor-pointer items-center justify-between border px-5 py-3.5 text-left text-sm font-medium tracking-wide transition-all duration-300 ${
                        active
                          ? 'border-charcoal bg-charcoal text-warm'
                          : 'border-charcoal/15 bg-white text-charcoal hover:border-brown'
                      }`}
                    >
                      <span>{range}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                          active ? 'border-brown bg-brown' : 'border-charcoal/30'
                        }`}
                        aria-hidden
                      />
                    </button>
                  )
                })}
              </div>

              <AnimatePresence initial={false}>
                {selectedBudget === 'Custom Budget' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 max-w-md">
                      <Field label="Enter Your Custom Budget (PHP)" required htmlFor="customBudget" error={err('customBudget')}>
                        <input
                          id="customBudget"
                          className={fieldClass}
                          placeholder="e.g. ₱15,000"
                          {...aria('customBudget')}
                          {...register('customBudget')}
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-4 text-xs text-charcoal/55">
                Note: These are budget preferences to help us tailor a recommendation — not fixed service prices or guaranteed quotations.
              </p>
            </Reveal>

            {/* 3. Coverage Preferences */}
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-charcoal/10 pb-4">
                <div>
                  <p className="eyebrow">Step 03</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">Preferred Coverage</h3>
                  <p className="mt-2 text-sm text-charcoal/65">Select all services you are interested in.</p>
                </div>
                {err('coverage') && (
                  <p role="alert" className="text-sm text-red-700">
                    {err('coverage')}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {coverageOptions.map((opt) => {
                  const Icon = coverageIcons[opt.id] ?? Camera
                  const active = selectedCoverage.includes(opt.label)
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleCoverage(opt.label)}
                      aria-pressed={active}
                      className={`flex min-h-18 cursor-pointer items-start justify-between gap-4 border px-5 py-4 text-left transition-all duration-300 ${
                        active
                          ? 'border-charcoal bg-charcoal text-warm'
                          : 'border-charcoal/15 bg-white text-charcoal hover:border-brown'
                      }`}
                    >
                      <span className="flex items-start gap-3.5">
                        <Icon
                          size={20}
                          strokeWidth={1.35}
                          className={`mt-0.5 shrink-0 ${active ? 'text-brown' : 'text-brown-dark'}`}
                          aria-hidden
                        />
                        <span>
                          <span className="block font-serif text-xl leading-snug">{opt.label}</span>
                          {opt.note && (
                            <span className={`mt-1 block text-xs ${active ? 'text-warm/70' : 'text-charcoal/55'}`}>
                              {opt.note}
                            </span>
                          )}
                        </span>
                      </span>
                      <span
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                          active ? 'border-brown bg-brown text-white' : 'border-charcoal/20'
                        }`}
                        aria-hidden
                      >
                        {active && <Check size={12} strokeWidth={2.5} />}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* 4. Additional Event Information */}
            <Reveal>
              <div className="border border-charcoal/10 bg-white p-6 md:p-10">
                <div className="mb-8 border-b border-charcoal/10 pb-4">
                  <p className="eyebrow">Step 04</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">Your Event Details</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full Name" required htmlFor="fullName" error={err('fullName')}>
                    <input
                      id="fullName"
                      autoComplete="name"
                      className={fieldClass}
                      placeholder="Your full name"
                      {...aria('fullName')}
                      {...register('fullName')}
                    />
                  </Field>

                  <Field label="Contact Number" required htmlFor="phone" error={err('phone')}>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldClass}
                      placeholder="+63 900 000 0000"
                      {...aria('phone')}
                      {...register('phone')}
                    />
                  </Field>

                  <Field label="Email Address" required htmlFor="email" error={err('email')}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="you@example.com"
                      {...aria('email')}
                      {...register('email')}
                    />
                  </Field>

                  <Field label="Event Type" required htmlFor="eventType" error={err('eventType')}>
                    <select id="eventType" className={fieldClass} {...aria('eventType')} {...register('eventType')}>
                      <option value="">Select event type</option>
                      {quotationEventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Event Date" required htmlFor="eventDate" error={err('eventDate')}>
                    <input id="eventDate" type="date" min={today} className={fieldClass} {...aria('eventDate')} {...register('eventDate')} />
                  </Field>

                  <Field label="Event Location / Venue" required htmlFor="location" error={err('location')}>
                    <input
                      id="location"
                      className={fieldClass}
                      placeholder="Venue name or city"
                      {...aria('location')}
                      {...register('location')}
                    />
                  </Field>
                </div>

                {/* Live Summary of Selections */}
                <div className="mt-6 grid gap-4 border border-charcoal/10 bg-warm/70 p-4 text-sm sm:grid-cols-2">
                  <div>
                    <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/55">
                      Estimated Budget
                    </span>
                    <span className="mt-1 block font-medium text-charcoal">
                      {selectedBudget === 'Custom Budget'
                        ? watch('customBudget') || 'Custom Budget (enter amount above)'
                        : selectedBudget || 'Not selected yet'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/55">
                      Preferred Coverage
                    </span>
                    <span className="mt-1 block font-medium text-charcoal">
                      {selectedCoverage.length > 0 ? selectedCoverage.join(', ') : 'None selected yet'}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Field
                    label="Additional Requests or Special Instructions"
                    htmlFor="message"
                    error={err('message')}
                  >
                    <textarea
                      id="message"
                      rows={4}
                      className={fieldClass}
                      placeholder="Tell us about your schedule, venue details, or any special moments you want captured…"
                      {...aria('message')}
                      {...register('message')}
                    />
                  </Field>
                </div>

                {/* Honeypot */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" {...register('website')} />
                  </label>
                </div>

                {status === 'unconfigured' && (
                  <div role="alert" className="mt-6 flex gap-3 border border-amber-700/40 bg-amber-50 p-4 text-sm text-amber-900">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p>
                      <strong>Your quote request was not sent.</strong> Online inquiries aren't connected yet.
                      {email ? (
                        <>
                          {' '}
                          Please email us directly at{' '}
                          <a className="underline" href={`mailto:${email}`}>
                            {email}
                          </a>
                          .
                        </>
                      ) : (
                        ' Please try again later or contact us directly.'
                      )}
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div role="alert" className="mt-6 flex gap-3 border border-red-700/40 bg-red-50 p-4 text-sm text-red-900">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p>Something went wrong and your request was not sent. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-8 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 border border-brown bg-brown px-8 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-brown-dark disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending Request…
                    </>
                  ) : (
                    'Request a Personalized Quote'
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-charcoal/50">
                  <span className="text-red-700">*</span> Required fields
                </p>
              </div>
            </Reveal>
          </form>
        )}
      </div>
    </section>
  )
}
