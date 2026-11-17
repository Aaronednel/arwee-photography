import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { useInquiry } from '../hooks/useInquiry'
import SmartImage from './ui/SmartImage'
import Button from './ui/Button'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { startInquiry } = useInquiry()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const { hero } = siteConfig

  return (
    <section id="home" ref={ref} className="relative flex min-h-svh items-center justify-center overflow-hidden bg-charcoal">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        {hero.video ? (
          <video
            className="h-full w-full object-cover"
            src={hero.video}
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <SmartImage src={hero.image} alt={hero.imageAlt} eager className="h-full w-full" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" aria-hidden />

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center text-warm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="eyebrow mb-6 text-warm/80! text-[1rem]!"
        >
          {hero.label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
          className="text-5xl font-light leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mx-auto mt-8 max-w-2xl text-base font-light text-warm/85 md:text-lg"
        >
          {hero.description}
        </motion.p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95, ease }}>
            <Button href="#portfolio" variant="light" className="w-64 sm:w-auto">Explore Our Work</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1, ease }}>
            <Button variant="outline-light" className="w-64 sm:w-auto" onClick={() => startInquiry()}>Book Your Event</Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-warm/70 hover:text-white"
      >
        <ChevronDown size={28} strokeWidth={1} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
