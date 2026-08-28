import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { experiences, type Experience } from '../data/content'
import { experienceShapes } from '../data/experienceShapes'
import { QuadPlate } from './QuadPlate'

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function JobDossier() {
  const [index, setIndex] = useState(0)
  const total = experiences.length
  const job = experiences[index]

  const cycle = (direction: 1 | -1) => {
    if (total === 0) {
      return
    }
    setIndex((current) => (current + direction + total) % total)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        cycle(1)
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        cycle(-1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [total])

  if (!job) {
    return (
      <section className="job-file" aria-label="Experience">
        <p className="job-file__empty">No roles listed yet.</p>
      </section>
    )
  }

  return (
    <section className="job-file" aria-label="Experience">
      <div className="job-file__tabs">
        <button
          type="button"
          className="persona__tab"
          onClick={() => cycle(-1)}
          aria-label="Previous role"
        >
          <span className="ps-btn ps-btn--l2">L1</span>
          <span>Prev</span>
        </button>
        <button
          type="button"
          className="persona__tab"
          onClick={() => cycle(1)}
          aria-label="Next role"
        >
          <span className="ps-btn ps-btn--l2">R1</span>
          <span>Next</span>
        </button>
      </div>

      <nav className="job-file__roster" aria-label="Roles">
        {experiences.map((item, itemIndex) => {
          const selected = itemIndex === index

          return (
            <button
              key={item.id}
              type="button"
              className={[
                'job-card',
                selected && 'is-selected',
                item.comingSoon && 'is-soon',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setIndex(itemIndex)}
              aria-current={selected ? 'true' : undefined}
              aria-label={
                item.comingSoon
                  ? `Coming soon, file ${itemIndex + 1}`
                  : `${item.company}, ${item.dates}`
              }
            >
              <QuadPlate
                className="job-card__plate"
                viewBox="0 0 420 102"
                outline={experienceShapes.card.red}
                fill={experienceShapes.card.black}
              >
                <span className="job-card__mark">{item.letter}</span>
                <span className="job-card__copy">
                  <span className="job-card__company">{item.company}</span>
                  <span className="job-card__dates">{item.dates}</span>
                </span>
              </QuadPlate>
            </button>
          )
        })}
      </nav>

      <AnimatePresence mode="wait">
        <motion.article
          key={job.id}
          className={['job-dossier', job.comingSoon && 'is-soon']
            .filter(Boolean)
            .join(' ')}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          aria-label={`${job.role} at ${job.company}`}
        >
          <JobDetail job={job} index={index} />
        </motion.article>
      </AnimatePresence>
    </section>
  )
}

function JobDetail({ job, index }: { job: Experience; index: number }) {
  return (
    <>
      <header className="job-dossier__head">
        <QuadPlate
          className="job-dossier__logo"
          viewBox="0 0 140 138"
          outline={experienceShapes.logo.red}
          fill={experienceShapes.logo.black}
        >
          {job.logo ? (
            <img src={job.logo} alt={`${job.company} logo`} />
          ) : (
            <span aria-hidden="true">{job.letter}</span>
          )}
        </QuadPlate>

        <div className="job-dossier__titles">
          <QuadPlate
            className="job-dossier__num"
            viewBox="0 0 220 96"
            outline={experienceShapes.number.red}
            fill={experienceShapes.number.black}
          >
            <span>NO.{padIndex(index)}</span>
          </QuadPlate>
          <QuadPlate
            className="job-dossier__company"
            viewBox="0 0 640 118"
            outline={experienceShapes.company.red}
            fill={experienceShapes.company.black}
          >
            <h2>{job.company}</h2>
          </QuadPlate>
          <QuadPlate
            className="job-dossier__role"
            viewBox="0 0 520 80"
            outline={experienceShapes.role.red}
            fill={experienceShapes.role.black}
          >
            <p>{job.role}</p>
          </QuadPlate>
        </div>
      </header>

      <ul className="job-dossier__meta" aria-label="Role details">
        <li>
          <QuadPlate
            className="persona-tag job-meta-tag"
            viewBox="0 0 220 62"
            outline={experienceShapes.tag.outline}
            fill={experienceShapes.tag.fill}
          >
            <span>{job.dates}</span>
          </QuadPlate>
        </li>
        {job.location && (
          <li>
            <QuadPlate
              className="persona-tag job-meta-tag"
              viewBox="0 0 220 62"
              outline={experienceShapes.tag.outline}
              fill={experienceShapes.tag.fill}
            >
              <span>{job.location}</span>
            </QuadPlate>
          </li>
        )}
      </ul>

      <QuadPlate
        className="job-dossier__box"
        viewBox="0 0 760 500"
        outline={experienceShapes.dossier.red}
        fill={experienceShapes.dossier.black}
      >
        <div className="job-dossier__inner">
          {job.comingSoon ? (
            <p className="job-dossier__soon">Coming soon</p>
          ) : (
            <>
              <p className="job-dossier__summary">{job.summary}</p>
              <p className="job-dossier__duties">Duties</p>
              <ul className="job-dossier__bullets">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {job.href && (
                <a
                  className="persona-box__next job-dossier__link"
                  href={job.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="persona-box__next-label">Company</span>
                  <span className="persona-box__next-name">Visit Site</span>
                </a>
              )}
            </>
          )}
        </div>
      </QuadPlate>
    </>
  )
}
