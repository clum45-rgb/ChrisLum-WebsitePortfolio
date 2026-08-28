import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type PageTransitionProps = {
  children: ReactNode
}

const contentVariants = {
  initial: {
    x: '55%',
    y: '-50%',
    skewX: -14,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: '-50%',
    skewX: 0,
    opacity: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    x: '-18%',
    y: '-50%',
    skewX: 8,
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 0.6, 1] as const,
    },
  },
}

const contentVariantsMobile = {
  initial: { x: '55%', y: 0, skewX: -14, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    skewX: 0,
    opacity: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    x: '-18%',
    y: 0,
    skewX: 8,
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 0.6, 1] as const,
    },
  },
}

const wipeVariants = {
  initial: { x: '110%', skewX: -18, opacity: 0.95 },
  animate: {
    x: '-130%',
    skewX: -18,
    opacity: 0.95,
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMobile = useMediaQuery('(max-width: 768px)')
  const variants = isMobile ? contentVariantsMobile : contentVariants

  return (
    <>
      <AnimatePresence mode="wait">
        {!isHome && (
          <motion.div
            key={location.pathname}
            className="page-content"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {isHome && children}

      <AnimatePresence>
        {!isHome && (
          <motion.div
            key={`wipe-${location.pathname}`}
            className="transition-wipe"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
