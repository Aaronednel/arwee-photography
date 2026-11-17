import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { useInquiry } from '../hooks/useInquiry'
import SmartImage from './ui/SmartImage'
import SectionHeading from './ui/SectionHeading'

export default function Services() {
  const { startInquiry } = useInquiry()
  return (
    <section id="services" className="bg-beige/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading label="WHAT WE DO" title="Our Services" description="Every occasion has a story worth capturing." />

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <SmartImage
                  src={s.image}
                  alt={`${s.title} — placeholder photo`}
                  aspect="aspect-[4/5]"
                  className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                />
              </div>
              <h3 className="mt-5 text-2xl leading-tight">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-charcoal/65">{s.description}</p>
              <button
                onClick={() => startInquiry({ eventType: s.eventType })}
                className="link-underline mt-4 inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-brown-dark"
              >
                Inquire Now <ArrowUpRight size={14} />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
