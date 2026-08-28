import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BattleMenu } from '../components/BattleMenu'
import { HudOverlay } from '../components/HudOverlay'
import { PageTransition } from '../components/PageTransition'
import { site } from '../data/content'
import {
  getMenuIndexFromPath,
  isSectionPath,
  menuItems,
} from '../data/menuItems'

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() =>
    isSectionPath(location.pathname)
      ? getMenuIndexFromPath(location.pathname)
      : null,
  )

  const onSectionPage = isSectionPath(location.pathname)
  const isAbout = location.pathname === '/about'

  useEffect(() => {
    if (onSectionPage) {
      setSelectedIndex(getMenuIndexFromPath(location.pathname))
      return
    }

    setSelectedIndex(null)
  }, [location.pathname, onSectionPage])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedIndex((index) => ((index ?? -1) + 1) % menuItems.length)
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedIndex(
          (index) =>
            ((index ?? 0) - 1 + menuItems.length) % menuItems.length,
        )
        return
      }

      if (event.key === 'Enter') {
        if (selectedIndex === null) {
          return
        }
        event.preventDefault()
        navigate(menuItems[selectedIndex].path)
        return
      }

      if (event.key === 'Escape' && onSectionPage) {
        event.preventDefault()
        navigate('/')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onSectionPage, navigate])

  return (
    <div
      className={[
        'app',
        onSectionPage && 'app--panel-open',
        isAbout && 'app--about',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        className="portrait"
        src={site.background.src}
        alt=""
        aria-hidden="true"
      />
      <div className="stage__vignette" aria-hidden="true" />
      <div className="stage__slash stage__slash--a" aria-hidden="true" />
      <div className="stage__slash stage__slash--b" aria-hidden="true" />
      <div className="stage__grain" aria-hidden="true" />

      <div className="app__ui">
        <HudOverlay panelOpen={onSectionPage} />
        <BattleMenu
          selectedIndex={selectedIndex}
          currentPath={location.pathname}
          onSelect={setSelectedIndex}
          onClear={() =>
            setSelectedIndex(
              onSectionPage ? getMenuIndexFromPath(location.pathname) : null,
            )
          }
        />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  )
}
