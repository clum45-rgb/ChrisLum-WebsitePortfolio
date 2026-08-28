import type { CSSProperties } from 'react'

type StencilNameProps = {
  text: string
  className?: string
  alternate?: boolean
}

const rotations = [-9, 4, -3, 7, -6, 2, 8, -4, 5, -8, 3]
const shifts = [0, -5, 3, -2, 6, -4, 1, 5, -3, 2, -6]
const inks = [false, false, true, false, true, false, false, true, false]

export function StencilName({ text, className, alternate }: StencilNameProps) {
  return (
    <span className={['stencil', className].filter(Boolean).join(' ')} aria-hidden="true">
      {text.split('').map((character, index) => {
        if (character === ' ') {
          return <span key={`space-${index}`} className="stencil__gap" />
        }

        const ink = alternate ? index % 2 === 0 : inks[index % inks.length]

        return (
          <span
            key={`${character}-${index}`}
            className={ink ? 'stencil__cell stencil__cell--ink' : 'stencil__cell'}
            style={
              {
                '--r': `${rotations[index % rotations.length]}deg`,
                '--y': `${shifts[index % shifts.length]}px`,
              } as CSSProperties
            }
          >
            {character}
          </span>
        )
      })}
    </span>
  )
}
