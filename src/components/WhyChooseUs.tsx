import { motion } from 'motion/react'
import { whyChooseUs } from '../data/whyChooseUs'
import SectionHeading from './ui/SectionHeading'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-beige/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading label="THE ARWEE DIFFERENCE" title="Why Choose Us?" />
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <Icon className="mx-auto text-brown" size={34} strokeWidth={1} aria-hidden />
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-charcoal/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
