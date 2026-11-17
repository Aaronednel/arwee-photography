import { MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

/** Floating Messenger quick-contact pill in the bottom-right corner. */
export default function FloatingContact() {
  const fbUrl = siteConfig.contact.facebook
  if (!fbUrl) return null

  const messengerHref = fbUrl.replace('https://www.facebook.com/', 'https://m.me/').replace('https://facebook.com/', 'https://m.me/')

  return (
    <a
      href={messengerHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on Facebook Messenger"
      className="fixed right-5 bottom-5 z-40 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-warm/15 bg-charcoal/95 px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-warm shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brown hover:bg-brown hover:text-white"
    >
      <MessageCircle size={16} strokeWidth={1.6} aria-hidden />
      <span>Messenger</span>
    </a>
  )
}
