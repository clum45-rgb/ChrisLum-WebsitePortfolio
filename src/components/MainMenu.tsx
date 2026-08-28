import type { CSSProperties } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { menuItems } from '../data/menuItems'

type MainMenuProps = {
  selectedIndex: number
  currentPath: string
  onSelect: (index: number) => void
}

export function MainMenu({
  selectedIndex,
  currentPath,
  onSelect,
}: MainMenuProps) {
  const navigate = useNavigate()

  return (
    <nav className="main-menu" aria-label="Portfolio sections">
      <ul className="main-menu__list" role="menu">
        {menuItems.map((item, index) => {
          const isSelected = index === selectedIndex
          const isCurrentRoute = currentPath === item.path

          return (
            <li
              key={item.id}
              role="none"
              className="main-menu__row"
              style={
                {
                  '--item-offset': `${item.offsetX}px`,
                  '--item-angle': `${item.angle}deg`,
                  '--item-brightness': item.brightness,
                } as CSSProperties
              }
            >
              <NavLink
                to={item.path}
                role="menuitem"
                className={[
                  'main-menu__item',
                  isSelected && 'main-menu__item--selected',
                  isCurrentRoute && 'main-menu__item--current',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onMouseEnter={() => onSelect(index)}
                onFocus={() => onSelect(index)}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(item.path)
                }}
              >
                <span className="main-menu__highlight" aria-hidden="true" />
                <span className="main-menu__label">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
