import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface InquirySelection {
  eventType?: string
  /** Changes on every request so the form re-applies identical selections. */
  nonce: number
}

interface Ctx {
  selection: InquirySelection
  startInquiry: (s?: { eventType?: string }) => void
}

const InquiryContext = createContext<Ctx | null>(null)

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<InquirySelection>({ nonce: 0 })

  const startInquiry = useCallback((s?: { eventType?: string }) => {
    setSelection((prev) => ({ ...s, nonce: prev.nonce + 1 }))
    requestAnimationFrame(() => {
      const target = document.getElementById('quotation') || document.getElementById('booking')
      target?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  const value = useMemo(() => ({ selection, startInquiry }), [selection, startInquiry])
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) throw new Error('useInquiry must be used inside <InquiryProvider>')
  return ctx
}
