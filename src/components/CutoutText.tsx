import type { CSSProperties } from 'react'

const ROTATIONS = [-3.8, 2.4, -1.6, 4.2, -2.9, 1.7, 3.5, -4.1, 2.6, -1.2, 3.9, -2.3]
const SHIFTS = [1.5, -2, 0.5, 2.2, -1.4, 1, -2.2, 0.8, 2, -1, 1.6, -1.8]

type CutoutTextProps = {
  text: string
}

export function CutoutText({ text }: CutoutTextProps) {
  return (
    <span className="cutout" aria-hidden="true">
      {text.split('').map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="cutout__letter"
          style={
            {
              '--r': `${ROTATIONS[index % ROTATIONS.length]}deg`,
              '--y': `${SHIFTS[index % SHIFTS.length]}px`,
            } as CSSProperties
          }
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  )
}
