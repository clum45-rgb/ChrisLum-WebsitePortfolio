import { SkillStarChart } from './SkillStarChart'
import { PageShell } from './PageShell'

export function SkillStarPanel() {
  return (
    <PageShell className="section-frame--contained skills-stage__star">
      <div className="skills-star-slot">
        <SkillStarChart />
      </div>
    </PageShell>
  )
}
