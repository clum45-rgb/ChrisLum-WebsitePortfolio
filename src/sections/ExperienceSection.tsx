import { experiences } from '../data/content'

export function ExperienceSection() {
  return (
    <>
      <h2 className="section-panel__title">Experience</h2>
      {experiences.length === 0 ? (
        <p className="section-panel__text">
          Internships, jobs, and research will be listed here. Send over your
          roles (title, company, dates, and a few bullets) and we can drop them
          in.
        </p>
      ) : (
        experiences.map((job) => (
          <article key={`${job.company}-${job.role}`} className="experience-card">
            <h3 className="experience-card__role">{job.role}</h3>
            <p className="experience-card__meta">
              {job.company}
              {job.location ? ` · ${job.location}` : ''}
              <span className="experience-card__dates">{job.dates}</span>
            </p>
            <ul className="experience-card__list">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))
      )}
    </>
  )
}
