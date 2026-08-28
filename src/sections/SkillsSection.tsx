import { SkillGroupsPanel } from '../components/SkillGroupsPanel'
import { SkillStarPanel } from '../components/SkillStarPanel'

export function SkillsSection() {
  return (
    <div className="skills-stage">
      <SkillGroupsPanel />
      <SkillStarPanel />
    </div>
  )
}
