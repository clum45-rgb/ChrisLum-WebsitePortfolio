import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [onClose])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        aria-label="Close image"
        onClick={onClose}
      >
        ×
      </button>
      <img
        className="lightbox__image"
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body,
  )
}
