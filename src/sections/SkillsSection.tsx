import { skillGroups } from '../data/content'

export function SkillsSection() {
  return (
    <>
      <h2 className="section-panel__title">Skills</h2>
      {skillGroups.map((group) => (
        <div key={group.title} className="skill-group">
          <h3 className="skill-group__title">{group.title}</h3>
          <ul className="skill-chips">
            {group.items.map((item) => (
              <li key={item} className="skill-chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
