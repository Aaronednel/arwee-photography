import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'solid' | 'outline' | 'outline-light' | 'light'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-all duration-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  solid: 'bg-brown text-white hover:bg-brown-dark border border-brown hover:border-brown-dark',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-warm',
  'outline-light': 'border border-white/70 text-white hover:bg-white hover:text-charcoal',
  light: 'bg-warm text-charcoal border border-warm hover:bg-transparent hover:text-warm',
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; href?: undefined }
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }

export default function Button(props: BtnProps | AnchorProps) {
  const { variant = 'solid', className = '', ...rest } = props
  const cls = `${base} ${variants[variant]} ${className}`
  if ('href' in rest && rest.href) {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />
  }
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls} />
}
