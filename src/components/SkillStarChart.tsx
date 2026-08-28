import type { CSSProperties } from 'react'
import {
  SKILL_MAX_RANK,
  skillRankNames,
  skillStats,
  type SkillStat,
} from '../data/content'

const CX = 200
const CY = 200
const OUTER = 172
const INNER_RATIO = 0.42
const POINT_COUNT = 5
const LABEL_TILTS = [-7, 6, -5, 8, -6]
const LABEL_ORBITS = ['42%', '41%', '41%', '41%', '41%']

function tipAngle(index: number) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / POINT_COUNT
}

function point(radius: number, angle: number) {
  return `${(CX + radius * Math.cos(angle)).toFixed(2)},${(CY + radius * Math.sin(angle)).toFixed(2)}`
}

function starPoints(tipRadii: number[]) {
  const points: string[] = []

  for (let i = 0; i < POINT_COUNT * 2; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / POINT_COUNT
    const isTip = i % 2 === 0
    const radius = isTip
      ? tipRadii[i / 2]
      : ((tipRadii[(i - 1) / 2] +
          tipRadii[((i + 1) / 2) % POINT_COUNT]) /
          2) *
        INNER_RATIO

    points.push(point(radius, angle))
  }

  return points.join(' ')
}

function regularStar(scale: number) {
  return starPoints(Array.from({ length: POINT_COUNT }, () => OUTER * scale))
}

function axisEnd(index: number) {
  const angle = tipAngle(index)
  return {
    x: CX + OUTER * Math.cos(angle),
    y: CY + OUTER * Math.sin(angle),
  }
}

function thresholdDot(statIndex: number, rank: number) {
  const angle = tipAngle(statIndex)
  const radius = (rank / SKILL_MAX_RANK) * OUTER
  return {
    cx: CX + radius * Math.cos(angle),
    cy: CY + radius * Math.sin(angle),
  }
}

function descriptionFor(stats: SkillStat[]) {
  return stats
    .map((stat) => `${stat.label} rank ${stat.level} of ${SKILL_MAX_RANK}`)
    .join(', ')
}

export function SkillStarChart() {
  const bodyPoints = regularStar(1)
  const ringPoints = Array.from({ length: SKILL_MAX_RANK }, (_, index) =>
    regularStar((index + 1) / SKILL_MAX_RANK),
  )
  const fillPoints = starPoints(
    skillStats.map((stat) => (stat.level / SKILL_MAX_RANK) * OUTER),
  )
  const corePoints = regularStar(0.12)

  return (
    <figure className="skill-star">
      <svg
        className="skill-star__chart"
        viewBox="0 0 400 400"
        role="img"
        aria-labelledby="skill-star-title"
        aria-describedby="skill-star-desc"
      >
        <title id="skill-star-title">Skill ranks</title>
        <desc id="skill-star-desc">{descriptionFor(skillStats)}</desc>

        <polygon className="skill-star__body" points={bodyPoints} />

        {ringPoints.map((points) => (
          <polygon
            key={points}
            className="skill-star__ring"
            points={points}
          />
        ))}

        {skillStats.map((stat, index) => {
          const end = axisEnd(index)
          return (
            <line
              key={`axis-${stat.id}`}
              className="skill-star__axis"
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
            />
          )
        })}

        {skillStats.flatMap((stat, statIndex) =>
          Array.from({ length: SKILL_MAX_RANK }, (_, rankIndex) => {
            const rank = rankIndex + 1
            const dot = thresholdDot(statIndex, rank)
            return (
              <circle
                key={`${stat.id}-${rank}`}
                className="skill-star__dot"
                cx={dot.cx}
                cy={dot.cy}
                r={rank === stat.level ? 3.2 : 2.1}
              />
            )
          }),
        )}

        <polygon className="skill-star__fill" points={fillPoints} />
        <polygon className="skill-star__core" points={corePoints} />
      </svg>

      <ul className="skill-star__labels">
        {skillStats.map((stat, index) => (
          <li
            key={stat.id}
            className="skill-star__label"
            style={
              {
                '--angle': `${index * 72}deg`,
                '--tilt': `${LABEL_TILTS[index]}deg`,
                '--orbit': LABEL_ORBITS[index],
              } as CSSProperties
            }
          >
            <span className="skill-star__badge" aria-hidden="true">
              {stat.level}
            </span>
            <span className="skill-star__plate">
              {stat.lines.map((line) => (
                <span key={line} className="skill-star__name">
                  {line}
                </span>
              ))}
            </span>
            <span className="skill-star__rank">
              {skillRankNames[stat.level]}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
