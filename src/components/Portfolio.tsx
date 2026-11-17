import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Play } from 'lucide-react'
import { portfolio, portfolioCategories, type PortfolioCategory } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import SmartImage from './ui/SmartImage'
import Lightbox from './Lightbox'

const shapeClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[3/2]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
} as const

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | PortfolioCategory>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const items = useMemo(() => (filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)), [filter])
  // Only show categories that actually contain items (plus "All").
  const categories = portfolioCategories.filter((c) => c.id === 'all' || portfolio.some((p) => p.category === c.id))

  return (
    <section id="portfolio" className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          dark
          label="PORTFOLIO"
          title="Selected Work"
          description="Stories, emotions, and unforgettable moments captured through our lens."
        />

        <div role="tablist" aria-label="Portfolio categories" className="no-scrollbar -mx-5 mb-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`min-h-11 shrink-0 cursor-pointer border px-5 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                filter === c.id ? 'border-brown bg-brown text-white' : 'border-warm/20 text-warm/70 hover:border-warm/60 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="masonry">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout="position"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setLightbox(i)}
                  aria-label={`View ${item.title}${item.type === 'video' ? ' (video)' : ''}`}
                  className="group relative block w-full cursor-pointer overflow-hidden text-left"
                >
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    aspect={shapeClass[item.shape]}
                    className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:560px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-serif text-xl text-warm">{item.title}</span>
                  </div>
                  {item.type === 'video' && (
                    <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/30 text-white backdrop-blur-sm">
                      <Play size={20} fill="currentColor" />
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-10 text-center text-xs tracking-wide text-warm/40">Placeholder photographs shown. Replace in src/data/portfolio.ts.</p>
      </div>

      <Lightbox items={items} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
