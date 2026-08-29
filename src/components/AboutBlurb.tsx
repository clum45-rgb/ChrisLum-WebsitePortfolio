import { useState } from 'react'
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

type AboutBlurbProps = {
  text: string
  onNext: () => void
}

export function AboutBlurb({ text, onNext }: AboutBlurbProps) {
  return (
    <>
      <p className="chat-bubble__text">{text}</p>
      <button
        type="button"
        className="chat-bubble__next"
        onClick={onNext}
        aria-label="Next message"
      >
        <span className="chat-bubble__next-caret" aria-hidden="true" />
      </button>
    </>
  )
}
