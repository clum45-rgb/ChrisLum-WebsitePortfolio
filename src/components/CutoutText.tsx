import type { CSSProperties } from 'react'

const ROTATIONS = [-1.8, 1.1, -0.8, 2.0, -1.4, 0.9, 1.6, -1.9, 1.2, -0.6, 1.8, -1.1]
const SHIFTS = [0.03, -0.045, 0.015, 0.05, -0.03, 0.025, -0.05, 0.02, 0.04, -0.025, 0.035, -0.04]

type CutoutTextProps = {
  text: string
  boxLetter?: string
}

export function CutoutText({ text, boxLetter }: CutoutTextProps) {
  const boxedIndex = boxLetter
    ? text.toUpperCase().indexOf(boxLetter.toUpperCase())
    : -1

  return (
    <span className="cutout" aria-hidden="true">
      {text.split('').map((character, index) => {
        if (character === ' ') {
          return <span key={`space-${index}`} className="cutout__gap" />
        }

        return (
          <span
            key={`${character}-${index}`}
            className={['cutout__letter', index === boxedIndex && 'cutout__letter--box']
              .filter(Boolean)
              .join(' ')}
            style={
              {
                '--r': `${ROTATIONS[index % ROTATIONS.length]}deg`,
                '--y': `${SHIFTS[index % SHIFTS.length]}em`,
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
