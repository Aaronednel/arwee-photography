import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface Props {
  src: string
  alt: string
  className?: string
  eager?: boolean
  /** Tailwind aspect class applied to the wrapper, e.g. "aspect-[4/5]". Prevents layout shift. */
  aspect?: string
  sizes?: string
}

/**
 * Lazy-loaded image with a reserved aspect ratio and a graceful fallback,
 * so a missing or broken image never breaks the layout.
 */
export default function SmartImage({ src, alt, className = '', eager, aspect = '', sizes }: Props) {
  const [failed, setFailed] = useState(!src)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-beige ${aspect} ${className}`}>
      {failed ? (
        <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-beige to-gray-light text-brown">
          <ImageOff size={22} strokeWidth={1.25} />
          <span className="eyebrow text-[0.6rem]!">Image placeholder</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
