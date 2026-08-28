import aboutVideo from '../assets/about me.mp4'
import projectsVideo from '../assets/experience.mp4'
import mainMenuVideo from '../assets/main menu.mp4'

export const defaultBackgroundVideo = mainMenuVideo

const backgroundVideos: Record<string, string> = {
  '/': mainMenuVideo,
  '/about': aboutVideo,
  '/projects': projectsVideo,
}

export function getBackgroundVideo(pathname: string): string {
  return backgroundVideos[pathname] ?? defaultBackgroundVideo
}
