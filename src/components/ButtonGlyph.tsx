import type { ButtonKind } from '../data/menuItems'

type ButtonGlyphProps = {
  kind: ButtonKind
}

export function ButtonGlyph({ kind }: ButtonGlyphProps) {
  if (kind === 'l2') {
    return (
      <span className="ps-btn ps-btn--l2" aria-hidden="true">
        L2
      </span>
    )
  }

  if (kind === 'dpad') {
    return (
      <span className="ps-btn ps-btn--dpad" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="23" fill="#111" />
          <circle cx="24" cy="24" r="20.5" fill="#f4f4f4" />
          <path fill="#111" d="M24 7 L28.2 14.8 H19.8 Z" />
          <path fill="#111" d="M24 41 L19.8 33.2 H28.2 Z" />
          <path fill="#111" d="M7 24 L14.8 19.8 V28.2 Z" />
          <path fill="#111" d="M41 24 L33.2 28.2 V19.8 Z" />
        </svg>
      </span>
    )
  }

  if (kind === 'triangle') {
    return (
      <span className="ps-btn ps-btn--face" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="23" fill="#111" />
          <circle cx="24" cy="24" r="20.5" fill="#f4f4f4" />
          <path fill="#2ec8ff" d="M24 12 L36 36 H12 Z" />
        </svg>
      </span>
    )
  }

  if (kind === 'square') {
    return (
      <span className="ps-btn ps-btn--face" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="23" fill="#111" />
          <circle cx="24" cy="24" r="20.5" fill="#f4f4f4" />
          <rect
            x="14"
            y="14"
            width="20"
            height="20"
            fill="none"
            stroke="#b14cff"
            strokeWidth="4"
          />
        </svg>
      </span>
    )
  }

  if (kind === 'circle') {
    return (
      <span className="ps-btn ps-btn--face" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="23" fill="#111" />
          <circle cx="24" cy="24" r="20.5" fill="#f4f4f4" />
          <circle
            cx="24"
            cy="24"
            r="10"
            fill="none"
            stroke="#e10600"
            strokeWidth="4.5"
          />
        </svg>
      </span>
    )
  }

  return (
    <span className="ps-btn ps-btn--face" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="23" fill="#111" />
        <circle cx="24" cy="24" r="20.5" fill="#f4f4f4" />
        <circle
          cx="24"
          cy="24"
          r="10"
          fill="none"
          stroke="#e10600"
          strokeWidth="4.5"
        />
      </svg>
    </span>
  )
}
