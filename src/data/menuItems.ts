export type SectionId = 'about' | 'experience' | 'projects' | 'skills' | 'contact'
export type BannerSlot = 'tl' | 'bl' | 'tr' | 'mr' | 'br'
export type ButtonKind = 'l2' | 'dpad' | 'triangle' | 'circle' | 'square'
export type SubStyle = 'script' | 'jp'

export type MenuItem = {
  id: SectionId
  label: string
  boxLetter: string
  sublabel: string
  subStyle: SubStyle
  path: string
  slot: BannerSlot
  button: ButtonKind
}

export const menuItems: MenuItem[] = [
  {
    id: 'about',
    label: 'ABOUT ME',
    boxLetter: 'O',
    sublabel: 'Know me',
    subStyle: 'script',
    path: '/about',
    slot: 'tl',
    button: 'l2',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    boxLetter: 'P',
    sublabel: '経歴',
    subStyle: 'jp',
    path: '/experience',
    slot: 'tr',
    button: 'square',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    boxLetter: 'O',
    sublabel: '連絡する',
    subStyle: 'jp',
    path: '/contact',
    slot: 'mr',
    button: 'circle',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    boxLetter: 'T',
    sublabel: 'プロジェクト',
    subStyle: 'jp',
    path: '/projects',
    slot: 'br',
    button: 'triangle',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    boxLetter: 'L',
    sublabel: 'スキル',
    subStyle: 'jp',
    path: '/skills',
    slot: 'bl',
    button: 'dpad',
  },
]

export function getMenuIndexFromPath(pathname: string): number {
  const index = menuItems.findIndex((item) => item.path === pathname)
  return index === -1 ? 0 : index
}

export function isSectionPath(pathname: string): boolean {
  return menuItems.some((item) => item.path === pathname)
}
