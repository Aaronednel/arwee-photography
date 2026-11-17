import { siteConfig } from '../../data/siteConfig'

interface Props {
  tone?: 'light' | 'dark'
  className?: string
}

/** Minimalist text logo. Reusable anywhere. Swap via siteConfig.brand.logoImage if a logo file is supplied. */
export default function Logo({ tone = 'light', className = '' }: Props) {
  const { name, subtitle, logoImage } = siteConfig.brand
  if (logoImage) return <img src={logoImage} alt={siteConfig.brand.fullName} className={`h-10 w-auto ${className}`} />
  const color = tone === 'light' ? 'text-warm' : 'text-charcoal'
  return (
    <span className={`inline-flex flex-col items-center leading-none ${color} ${className}`} aria-label={siteConfig.brand.fullName}>
      <span className="font-serif text-[1.75rem] font-medium tracking-[0.42em] pl-[0.42em]">{name}</span>
      <span className="mt-1.5 text-[0.5rem] font-medium tracking-[0.5em] pl-[0.5em] opacity-80">{subtitle}</span>
    </span>
  )
}
