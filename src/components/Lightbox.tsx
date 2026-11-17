import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Film, X } from 'lucide-react'
import type { PortfolioItem } from '../data/portfolio'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

interface Props {
  items: PortfolioItem[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
}

function parseVideoSource(url?: string): { isEmbed: boolean; embedUrl: string } {
  if (!url) return { isEmbed: false, embedUrl: '' }

  // Facebook video URL
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return {
      isEmbed: true,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`,
    }
  }

  // YouTube URL
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  if (ytMatch) {
    return {
      isEmbed: true,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    }
  }

  // Vimeo URL
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) {
    return {
      isEmbed: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    }
  }

  // Direct MP4 / video file URL
  return { isEmbed: false, embedUrl: url }
}

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null
  useBodyScrollLock(open)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [open, onClose, go])

  const item = index !== null ? items[index] : null
  const videoInfo = item?.type === 'video' ? parseVideoSource(item.videoSrc) : null

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 text-warm" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs tracking-[0.25em] uppercase text-warm/60">
              {(index ?? 0) + 1} / {items.length}
            </p>
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="flex h-11 w-11 cursor-pointer items-center justify-center hover:text-brown">
              <X size={26} strokeWidth={1.25} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="flex max-h-full max-w-full flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {item.type === 'video' && item.videoSrc ? (
                  videoInfo?.isEmbed ? (
                    <div className="relative aspect-video w-[90vw] max-w-4xl max-h-[75vh] overflow-hidden bg-black shadow-2xl">
                      <iframe
                        src={videoInfo.embedUrl}
                        title={item.title}
                        className="h-full w-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      key={item.videoSrc}
                      src={item.videoSrc}
                      poster={item.src}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[75vh] max-w-full"
                    />
                  )
                ) : (
                  <div className="relative">
                    <img src={item.src} alt={item.alt} className="max-h-[75vh] max-w-full object-contain" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-center text-warm">
                        <Film strokeWidth={1.25} />
                        <p className="text-sm">Video not yet configured.</p>
                        <p className="px-4 text-xs text-warm/60">Add a Facebook, YouTube, or .mp4 link to videoSrc in src/data/portfolio.ts</p>
                      </div>
                    )}
                  </div>
                )}
                <figcaption className="mt-4 flex flex-col items-center gap-1.5 text-center">
                  <span className="font-serif text-xl text-warm">{item.title}</span>
                  {item.type === 'video' && item.videoSrc && (item.videoSrc.includes('facebook.com') || item.videoSrc.includes('fb.watch')) && (
                    <a
                      href={item.videoSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-xs uppercase tracking-[0.2em] text-brown hover:text-white"
                    >
                      Open directly on Facebook ↗
                    </a>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous" className="absolute left-1 flex h-12 w-12 cursor-pointer items-center justify-center text-warm hover:text-brown md:left-5">
                  <ChevronLeft size={34} strokeWidth={1} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next" className="absolute right-1 flex h-12 w-12 cursor-pointer items-center justify-center text-warm hover:text-brown md:right-5">
                  <ChevronRight size={34} strokeWidth={1} />
                </button>
              </>
            )}
          </div>
          <div className="h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
