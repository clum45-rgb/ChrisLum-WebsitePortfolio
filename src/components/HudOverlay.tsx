import { Link } from 'react-router-dom'
import { site } from '../data/content'

type HudOverlayProps = {
  panelOpen: boolean
}

export function HudOverlay({ panelOpen }: HudOverlayProps) {
  const name = (
    <>
      <span className="hud__name-red" aria-hidden="true" />
      <div className="hud__name-plate">
        <p className="hud__name-title">{site.hudName}</p>
        <p className="hud__name-caption">{site.hudCaption}</p>
      </div>
    </>
  )

  return (
    <div className="hud">
      {panelOpen ? (
        <Link
          to="/"
          className="hud__name hud__name--link"
          aria-label="Back to home"
        >
          {name}
        </Link>
      ) : (
        <div className="hud__name">{name}</div>
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
