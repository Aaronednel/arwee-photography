import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import SectionHeading from './ui/SectionHeading'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const t = testimonials[i]
  const go = (d: 1 | -1) => {
    setDir(d)
    setI((i + d + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="bg-warm py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <SectionHeading label="TESTIMONIALS" title="What Our Clients Say" />

        <div className="relative text-center" aria-roledescription="carousel" aria-label="Client testimonials">
          <Quote className="mx-auto mb-6 text-brown/60" size={36} strokeWidth={1} aria-hidden />
          <div className="min-h-[18rem] sm:min-h-[15rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="font-serif text-2xl leading-snug text-charcoal md:text-3xl">“{t.feedback}”</blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-3">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-beige font-serif text-xl text-brown-dark" aria-hidden>
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-medium tracking-wide">{t.name}</span>
                    <span className="eyebrow text-[0.65rem]!">{t.eventType}</span>
                  </span>
                  {t.isSample && <span className="border border-brown/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-brown-dark">Sample testimonial</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 cursor-pointer items-center justify-center border border-charcoal/20 transition-colors hover:bg-charcoal hover:text-warm">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((x, idx) => (
                  <button
                    key={x.id}
                    onClick={() => { setDir(idx > i ? 1 : -1); setI(idx) }}
                    aria-label={`Show testimonial ${idx + 1}`}
                    aria-current={idx === i}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center"
                  >
                    <span className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? 'w-6 bg-brown' : 'w-1.5 bg-charcoal/25'}`} />
                  </button>
                ))}
              </div>
              <button onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 cursor-pointer items-center justify-center border border-charcoal/20 transition-colors hover:bg-charcoal hover:text-warm">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
