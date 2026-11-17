import { motion } from 'motion/react'
import { siteConfig } from '../data/siteConfig'
import SmartImage from './ui/SmartImage'
import Reveal from './ui/Reveal'
import Button from './ui/Button'

export default function About() {
  const { about } = siteConfig
  return (
    <section id="about" className="bg-warm py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative border border-charcoal/10 bg-white p-3 sm:p-4">
          <div className="relative overflow-hidden">
            <SmartImage
              src={about.image}
              alt={about.imageAlt}
              aspect="aspect-[4/5]"
              className="w-full"
              sizes="(min-width:1024px) 50vw, 100vw"
            />
            {/* Curtain reveal: a warm panel slides away when the image enters the viewport. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 origin-right bg-warm"
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
            />
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">{about.label}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl">{about.heading}</h2>
            <span className="mt-6 block h-px w-12 bg-brown" aria-hidden />
          </Reveal>
          <Reveal delay={0.15} className="mt-8 space-y-5 text-charcoal/70 md:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Button href="#why-us" variant="outline">Learn More</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
