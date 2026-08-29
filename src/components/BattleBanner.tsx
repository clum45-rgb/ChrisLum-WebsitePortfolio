import { NavLink } from 'react-router-dom'
import type { MenuItem } from '../data/menuItems'
import { bannerShapes } from '../data/bannerShapes'
import { ButtonGlyph } from './ButtonGlyph'
import { CutoutText } from './CutoutText'

type BattleBannerProps = {
  item: MenuItem
  selected: boolean
  current: boolean
  onSelect: () => void
  onClear: () => void
}

export function BattleBanner({
  item,
  selected,
  current,
  onSelect,
  onClear,
}: BattleBannerProps) {
  const shape = bannerShapes[item.slot]
  const isLeft = item.slot === 'tl' || item.slot === 'bl'

  return (
    <NavLink
      to={item.path}
      className={[
        'banner',
        `banner--${item.slot}`,
        isLeft ? 'banner--left' : 'banner--right',
        selected && 'is-selected',
        current && 'is-current',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={item.label}
      aria-current={current ? 'page' : undefined}
      onMouseEnter={onSelect}
      onMouseLeave={onClear}
      onFocus={onSelect}
      onBlur={onClear}
    >
      <span className="banner__slash" aria-hidden="true" />
      <svg
        className="banner__shape banner__shape--red"
        viewBox="0 0 560 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points={shape.red} />
      </svg>
      <svg
        className="banner__shape banner__shape--black"
        viewBox="0 0 560 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points={shape.black} />
      </svg>
      <span className="banner__copy">
        <span className="banner__label">
          <CutoutText text={item.label} boxLetter={item.boxLetter} />
        </span>
        <span className={`banner__sub banner__sub--${item.subStyle}`}>
          {item.sublabel}
        </span>
      </span>
      <span className="banner__btn">
        <ButtonGlyph kind={item.button} />
      </span>
    </NavLink>
  )
}
