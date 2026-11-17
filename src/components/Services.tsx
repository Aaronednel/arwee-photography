import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { useInquiry } from '../hooks/useInquiry'
import SmartImage from './ui/SmartImage'
import SectionHeading from './ui/SectionHeading'

export default function Services() {
  const { startInquiry } = useInquiry()
  return (
    <section id="services" className="bg-beige/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading label="WHAT WE DO" title="Our Services" description="Every occasion has a story worth capturing." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col border border-charcoal/8 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brown/40"
            >
              <div className="overflow-hidden">
                <SmartImage
                  src={s.image}
                  alt={`${s.title} — placeholder photo`}
                  aspect="aspect-[4/5]"
                  className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                <h3 className="text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-sm text-charcoal/65">{s.description}</p>
                <button
                  type="button"
                  onClick={() => startInquiry({ eventType: s.eventType })}
                  className="link-underline mt-5 inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-brown-dark"
                >
                  Inquire Now <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
