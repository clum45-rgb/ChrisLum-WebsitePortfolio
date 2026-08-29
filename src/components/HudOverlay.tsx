import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/content'

type HudOverlayProps = {
  panelOpen: boolean
  persistName?: boolean
}

function currentScrollOffset(event?: Event) {
  let top = window.scrollY

  if (event?.target instanceof HTMLElement) {
    top = Math.max(top, event.target.scrollTop)
  }

  document.querySelectorAll('.page-content').forEach((node) => {
    if (node instanceof HTMLElement) {
      top = Math.max(top, node.scrollTop)
    }
  })

  return top
}

export function HudOverlay({ panelOpen, persistName = false }: HudOverlayProps) {
  const { pathname } = useLocation()
  const [scrolledAway, setScrolledAway] = useState(false)

  useEffect(() => {
    if (persistName) {
      setScrolledAway(false)
      return
    }

    const onScroll = (event?: Event) => {
      setScrolledAway(currentScrollOffset(event) > 16)
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('scroll', onScroll)
    }
  }, [persistName, panelOpen, pathname])

  const name = (
    <>
      <span className="hud__name-red" aria-hidden="true" />
      <div className="hud__name-plate">
        <p className="hud__name-title">{site.hudName}</p>
        <p className="hud__name-caption">{site.hudCaption}</p>
      </div>
    </>
  )

  const nameClass = [
    'hud__name',
    panelOpen && 'hud__name--link',
    scrolledAway && 'is-scrolled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="hud">
      {panelOpen ? (
        <Link to="/" className={nameClass} aria-label="Back to home">
          {name}
        </Link>
      ) : (
        <div className={nameClass}>{name}</div>
      )}

      <div className="hud__prompts">
        {!panelOpen && (
          <div className="hud__prompt">
            <span className="hud__prompt-label">Confirm</span>
            <kbd className="hud__key">↵</kbd>
          </div>
        )}
        {panelOpen && (
          <Link to="/" className="hud__prompt hud__prompt--link" aria-label="Back to home">
            <span className="hud__prompt-label">Back</span>
            <kbd className="hud__key">Esc</kbd>
          </Link>
        )}
      </div>
    </div>
  )
}
