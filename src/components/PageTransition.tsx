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
    skewX: -16,
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

const aboutVariants = {
  initial: { opacity: 0, scale: 0.96, x: 0, y: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    x: 0,
    y: 0,
    transition: {
      duration: 0.22,
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
  initial: { x: '110%', skewX: -22, opacity: 1 },
  animate: {
    x: '-220%',
    skewX: -22,
    opacity: 0,
    transition: {
      x: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
      skewX: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.16, delay: 0.32 },
    },
  },
  exit: { opacity: 0, transition: { duration: 0.08 } },
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
  const isAbout = location.pathname === '/about'
  const isSkills = location.pathname === '/skills'
  const isMobile = useMediaQuery('(max-width: 768px)')
  const variants =
    isAbout || isSkills
      ? aboutVariants
      : isMobile
        ? contentVariantsMobile
        : contentVariants

  const contentClass = [
    'page-content',
    isAbout && 'page-content--about',
    isSkills && 'page-content--skills',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <AnimatePresence mode="wait">
        {!isHome && (
          <motion.div
            key={location.pathname}
            className={contentClass}
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
