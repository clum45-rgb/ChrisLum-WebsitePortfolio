export type SectionId = 'about' | 'projects' | 'skills' | 'contact'

export type MenuItem = {
  id: SectionId
  label: string
  path: string
  offsetX: number
  angle: number
  brightness: number
}

export const menuItems: MenuItem[] = [
  { id: 'about', label: 'ABOUT ME', path: '/about', offsetX: 0, angle: -6, brightness: 1 },
  { id: 'projects', label: 'PROJECTS', path: '/projects', offsetX: 28, angle: -2, brightness: 0.72 },
  { id: 'skills', label: 'SKILLS', path: '/skills', offsetX: 8, angle: 2, brightness: 0.52 },
  { id: 'contact', label: 'CONTACT', path: '/contact', offsetX: 32, angle: 6, brightness: 0.62 },
]

export function getMenuIndexFromPath(pathname: string): number {
  const index = menuItems.findIndex((item) => item.path === pathname)
  return index === -1 ? 0 : index
}

export function isSectionPath(pathname: string): boolean {
  return menuItems.some((item) => item.path === pathname)
}
