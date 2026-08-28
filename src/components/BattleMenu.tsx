import { motion, useReducedMotion } from 'framer-motion'
import type { BannerSlot } from '../data/menuItems'
import { menuItems } from '../data/menuItems'
import { BattleBanner } from './BattleBanner'

type BattleMenuProps = {
  selectedIndex: number | null
  currentPath: string
  onSelect: (index: number) => void
  onClear: () => void
}

const enterFrom: Record<BannerSlot, { x: number; y: number }> = {
  tl: { x: -140, y: -90 },
  bl: { x: -140, y: 90 },
  tr: { x: 140, y: -90 },
  mr: { x: 160, y: 0 },
  br: { x: 140, y: 90 },
}

export function BattleMenu({
  selectedIndex,
  currentPath,
  onSelect,
  onClear,
}: BattleMenuProps) {
  const reduceMotion = useReducedMotion()

  return (
    <nav className="battle-menu" aria-label="Portfolio sections">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.id}
          className={`banner-wrap banner-wrap--${item.slot}`}
          initial={
            reduceMotion
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, ...enterFrom[item.slot] }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.08 + index * 0.08,
            ease: [0.16, 1.4, 0.32, 1],
          }}
        >
          <BattleBanner
            item={item}
            selected={index === selectedIndex}
            current={currentPath === item.path}
            onSelect={() => onSelect(index)}
            onClear={onClear}
          />
        </motion.div>
      ))}
    </nav>
  )
}
