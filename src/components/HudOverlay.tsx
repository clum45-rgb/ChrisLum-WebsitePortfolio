import { site } from '../data/content'

type HudOverlayProps = {
  panelOpen: boolean
}

export function HudOverlay({ panelOpen }: HudOverlayProps) {
  return (
    <div className="hud">
      <div className="hud__info-box">
        <p className="hud__info-primary">{site.hudName}</p>
        <p className="hud__info-caption">{site.hudCaption}</p>
      </div>

      <div className="hud__prompts">
        <div className="hud__prompt">
          <span className="hud__prompt-label">Confirm</span>
          <kbd className="hud__key">↵</kbd>
        </div>
        {panelOpen && (
          <div className="hud__prompt">
            <span className="hud__prompt-label">Close</span>
            <kbd className="hud__key">Esc</kbd>
          </div>
        )}
      </div>
    </div>
  )
}
