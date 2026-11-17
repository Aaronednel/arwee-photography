import { MotionConfig } from 'motion/react'
import { InquiryProvider } from './hooks/useInquiry'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <InquiryProvider>
        <Navbar />
        <Home />
        <Footer />
      </InquiryProvider>
    </MotionConfig>
  )
}
