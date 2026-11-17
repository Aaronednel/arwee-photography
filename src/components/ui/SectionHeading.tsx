import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface Props {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  children?: ReactNode
}

export default function SectionHeading({ label, title, description, align = 'center', dark }: Props) {
  return (
    <Reveal className={`mx-auto mb-12 max-w-2xl md:mb-16 ${align === 'center' ? 'text-center' : 'text-left mx-0'}`}>
      {label && <p className="eyebrow mb-4">{label}</p>}
      <h2 className={`text-4xl tracking-wide uppercase md:text-5xl ${dark ? 'text-warm' : 'text-charcoal'}`}>{title}</h2>
      <span className={`mt-6 block h-px w-12 bg-brown ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden />
      {description && <p className={`mt-6 text-base md:text-lg ${dark ? 'text-warm/70' : 'text-charcoal/65'}`}>{description}</p>}
    </Reveal>
  )
}
