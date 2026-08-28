import type { BannerSlot } from '../data/menuItems'

type BannerShape = {
  red: string
  black: string
}

/** Irregular quads: still read as plates, but each taper and stretch is unique. */
export const bannerShapes: Record<BannerSlot, BannerShape> = {
  tl: {
    red: '0,8 560,30 546,138 4,156',
    black: '12,20 546,46 528,116 22,144',
  },
  bl: {
    red: '2,28 560,6 556,118 0,160',
    black: '18,42 546,26 538,92 12,148',
  },
  tr: {
    red: '10,36 560,0 560,160 22,130',
    black: '28,50 548,18 544,146 48,108',
  },
  mr: {
    red: '8,22 560,24 552,146 18,128',
    black: '30,38 546,40 540,128 44,112',
  },
  br: {
    red: '14,8 560,22 560,148 0,152',
    black: '34,26 540,40 550,124 14,132',
  },
}
