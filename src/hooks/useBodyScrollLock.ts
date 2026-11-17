import { useEffect } from 'react'

/** Locks page scroll while `locked` is true (modals, lightbox, mobile menu). */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPad
    }
  }, [locked])
}
