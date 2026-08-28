import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getBackgroundVideo } from '../data/backgroundVideos'
import { HudOverlay } from '../components/HudOverlay'
import { MainMenu } from '../components/MainMenu'
import { PageTransition } from '../components/PageTransition'
import {
  getMenuIndexFromPath,
  isSectionPath,
  menuItems,
} from '../data/menuItems'

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(() =>
    getMenuIndexFromPath(location.pathname),
  )
  const [syncedPath, setSyncedPath] = useState(location.pathname)

  const onSectionPage = isSectionPath(location.pathname)
  const backgroundVideo = getBackgroundVideo(location.pathname)

  if (location.pathname !== syncedPath) {
    setSyncedPath(location.pathname)
    if (isSectionPath(location.pathname)) {
      setSelectedIndex(getMenuIndexFromPath(location.pathname))
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((index) => (index + 1) % menuItems.length)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex(
          (index) => (index - 1 + menuItems.length) % menuItems.length,
        )
        return
      }

      if (event.key === 'Enter') {
        const target = event.target as HTMLElement | null
        if (target?.closest('a, button, input, textarea, [tabindex]')) {
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
    <div className="app">
      <video
        key={backgroundVideo}
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        src={backgroundVideo}
      />

      <div className="app__overlay" aria-hidden="true" />

      <div className="app__ui">
        <HudOverlay panelOpen={onSectionPage} />
        <MainMenu
          selectedIndex={selectedIndex}
          currentPath={location.pathname}
          onSelect={setSelectedIndex}
        />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  )
}
