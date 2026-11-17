import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { useInquiry } from '../hooks/useInquiry'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import Logo from './ui/Logo'
import Button from './ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { startInquiry } = useInquiry()
  useBodyScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = siteConfig.nav.map((n) => n.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-charcoal/95 py-3 backdrop-blur-md' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10" aria-label="Main navigation">
        <a href="#home" aria-label="Arwee Photography & Films — home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={active === n.href}
              className="link-underline text-[0.72rem] font-medium uppercase tracking-[0.2em] text-warm/85 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
          <Button variant="solid" className="ml-2 px-5! py-2.5!" onClick={() => startInquiry()}>
            Book an Event
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center text-warm lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={26} strokeWidth={1.25} /> : <Menu size={26} strokeWidth={1.25} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4.25rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto bg-charcoal lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 px-6 py-10">
              {siteConfig.nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="font-serif text-3xl tracking-wide text-warm"
                >
                  {n.label}
                </motion.a>
              ))}
              <Button
                className="mt-4 w-full max-w-xs"
                onClick={() => {
                  setOpen(false)
                  startInquiry()
                }}
              >
                Book an Event
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
