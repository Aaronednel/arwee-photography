import { motion, type HTMLMotionProps } from 'motion/react'

interface Props extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Scroll-triggered fade + slide-up. Honors reduced motion via <MotionConfig reducedMotion="user">. */
export default function Reveal({ delay = 0, y = 24, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
