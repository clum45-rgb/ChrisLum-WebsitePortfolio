import { useEffect, useState } from 'react'
import aboutBlurbs from '../data/aboutBlurbs.json'

export type AboutSlide = {
  text: string
  photo?: string
  photoFit?: 'wave' | 'bust' | 'tall'
  alt?: string
}

const slides = aboutBlurbs as AboutSlide[]
const STORAGE_KEY = 'about-blurb-index'

function readLastIndex() {
  try {
    const stored = Number(sessionStorage.getItem(STORAGE_KEY))
    if (Number.isFinite(stored)) {
      return stored
    }
  } catch {
    /* ignore */
  }
  return -1
}

function writeIndex(index: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(index))
  } catch {
    /* ignore */
  }
}

function indexForNewVisit() {
  const next = (readLastIndex() + 1) % slides.length
  writeIndex(next)
  return next
}

export function useAboutCarousel() {
  const [index, setIndex] = useState(() => indexForNewVisit())

  const showNext = () => {
    setIndex((current) => {
      const next = (current + 1) % slides.length
      writeIndex(next)
      return next
    })
  }

  return {
    slide: slides[index],
    index,
    showNext,
  }
}

const TYPE_MS = 26

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

type AboutBlurbProps = {
  text: string
  onNext: () => void
}

export function AboutBlurb({ text, onNext }: AboutBlurbProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [shown, setShown] = useState(() =>
    reducedMotion ? text.length : 0,
  )
  const typing = shown < text.length

  useEffect(() => {
    if (reducedMotion) {
      setShown(text.length)
    }
  }, [reducedMotion, text.length])

  useEffect(() => {
    if (reducedMotion || shown >= text.length) {
      return
    }

    const id = window.setTimeout(() => {
      setShown((count) => Math.min(count + 1, text.length))
    }, TYPE_MS)

    return () => window.clearTimeout(id)
  }, [reducedMotion, shown, text.length])

  const onClick = () => {
    if (typing) {
      setShown(text.length)
      return
    }

    onNext()
  }

  return (
    <>
      <p className="chat-bubble__text">
        <span className="chat-bubble__text-ghost" aria-hidden="true">
          {text}
        </span>
        <span className="chat-bubble__text-live">{text.slice(0, shown)}</span>
      </p>
      <button
        type="button"
        className={['chat-bubble__next', typing && 'is-typing']
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        aria-label={typing ? 'Skip typing' : 'Next message'}
      >
        {typing ? (
          <span className="chat-bubble__next-wait" aria-hidden="true">
            ...
          </span>
        ) : (
          <span className="chat-bubble__next-caret" aria-hidden="true" />
        )}
      </button>
    </>
  )
}
