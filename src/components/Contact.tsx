import { Mail, MapPin, Phone } from 'lucide-react'
import { Facebook, Instagram } from './ui/SocialIcons'
import { siteConfig } from '../data/siteConfig'
import { useInquiry } from '../hooks/useInquiry'
import Button from './ui/Button'
import Reveal from './ui/Reveal'

const TBA = <span className="text-warm/35 italic">To be provided</span>

export default function Contact() {
  const { startInquiry } = useInquiry()
  const c = siteConfig.contact as {
    email?: string
    phone?: string
    facebook?: string
    facebookName?: string
    instagram?: string
    instagramName?: string
    location?: string
  }

  const fbText = c.facebookName || (c.facebook ? 'Facebook' : '')
  const igText = c.instagramName || (c.instagram ? 'Instagram' : '')

  // Only include Instagram if it is configured
  const items = [
    { icon: Mail, label: 'Email', value: c.email || '', href: c.email ? `mailto:${c.email}` : '' },
    { icon: Phone, label: 'Phone', value: c.phone || '', href: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, '')}` : '' },
    { icon: Facebook, label: 'Facebook', value: fbText, href: c.facebook || '' },
    ...(c.instagram ? [{ icon: Instagram, label: 'Instagram', value: igText, href: c.instagram }] : []),
    { icon: MapPin, label: 'Location', value: c.location || '', href: '' },
  ]

  const gridCols = items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'

  return (
    <section id="contact" className="bg-charcoal py-24 text-warm md:py-32">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-10">
        <Reveal>
          <p className="eyebrow mb-4">CONTACT</p>
          <h2 className="text-4xl uppercase tracking-wide md:text-5xl">Let's Work Together.</h2>
          <span className="mx-auto mt-6 block h-px w-12 bg-brown" aria-hidden />
          <p className="mt-6 text-lg text-warm/70">Have an event coming up? We'd love to hear about it.</p>
        </Reveal>

        <Reveal delay={0.15} className={`mt-14 grid gap-px bg-warm/10 text-left sm:grid-cols-2 ${gridCols}`}>
          {items.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex min-w-0 flex-col items-center justify-center bg-charcoal px-5 py-8 text-center">
              <Icon size={22} strokeWidth={1.25} className="text-brown" aria-hidden />
              <p className="eyebrow mt-4 text-[0.62rem]! text-warm/50!">{label}</p>
              <p className="mt-2 max-w-full text-sm break-all sm:break-words">
                {value ? (
                  href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="link-underline break-all">
                      {value}
                    </a>
                  ) : (
                    value
                  )
                ) : (
                  TBA
                )}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
          <Button onClick={() => startInquiry()}>Send a Direct Inquiry</Button>
        </Reveal>
      </div>
    </section>
  )
}
