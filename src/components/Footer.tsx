import { Facebook, Instagram } from './ui/SocialIcons'
import { siteConfig } from '../data/siteConfig'
import { services } from '../data/services'
import Logo from './ui/Logo'

export default function Footer() {
  const c = siteConfig.contact as {
    email?: string
    phone?: string
    facebook?: string
    instagram?: string
    location?: string
  }
  const socials = [
    { icon: Facebook, label: 'Facebook', href: c.facebook },
    { icon: Instagram, label: 'Instagram', href: c.instagram },
  ].filter((s) => Boolean(s.href))

  const col = 'text-[0.7rem] font-medium uppercase tracking-[0.25em] text-warm mb-5'
  const link = 'text-sm text-warm/60 transition-colors hover:text-warm'

  return (
    <footer className="border-t border-warm/10 bg-[#1b1b1b] text-warm">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 font-serif text-xl italic text-warm/70">{siteConfig.brand.tagline}</p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-warm/20 hover:border-brown hover:text-brown"
                >
                  <Icon size={18} strokeWidth={1.25} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer navigation">
          <h2 className={col}>Quick Links</h2>
          <ul className="space-y-2">
            {siteConfig.nav.map((n) => <li key={n.href}><a href={n.href} className={link}>{n.label}</a></li>)}
          </ul>
        </nav>

        <div>
          <h2 className={col}>Services</h2>
          <ul className="space-y-2">
            {services.map((s) => <li key={s.id}><a href="#services" className={link}>{s.title}</a></li>)}
          </ul>
        </div>

        <div>
          <h2 className={col}>Contact</h2>
          <ul className="space-y-2 text-sm text-warm/60">
            <li className="break-all">{c.email ? <a className={link} href={`mailto:${c.email}`}>{c.email}</a> : <span className="italic text-warm/30">Email — to be provided</span>}</li>
            <li>{c.phone ? <a className={link} href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}>{c.phone}</a> : <span className="italic text-warm/30">Phone — to be provided</span>}</li>
            <li>{c.location || <span className="italic text-warm/30">Location — to be provided</span>}</li>
          </ul>
          <a href="#portfolio" className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.2em] text-brown">View Portfolio</a>
        </div>
      </div>
      <div className="border-t border-warm/10 py-6 text-center text-xs tracking-wide text-warm/40">
        © {new Date().getFullYear()} {siteConfig.copyright}. All rights reserved.
      </div>
    </footer>
  )
}
