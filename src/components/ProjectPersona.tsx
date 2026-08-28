import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personaShapes } from '../data/personaShapes'
import { projects, type Project } from '../data/content'
import { Lightbox } from './Lightbox'
import { QuadPlate } from './QuadPlate'

type ActiveImage = {
  src: string
  alt: string
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function ProjectPersona() {
  const [index, setIndex] = useState(0)
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)
  const project = projects[index]
  const heading = project.heading ?? project.title
  const total = projects.length

  const cycle = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + total) % total)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeImage) {
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        cycle(1)
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        cycle(-1)
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        window.open(project.href, '_blank', 'noopener,noreferrer')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage, project, total])

  return (
    <section className="persona" aria-label="Projects">
      <div className="persona__tabs">
        <button
          type="button"
          className="persona__tab"
          onClick={() => cycle(-1)}
          aria-label="Previous project"
        >
          <span className="ps-btn ps-btn--l2">L1</span>
          <span>Prev</span>
        </button>
        <button
          type="button"
          className="persona__tab"
          onClick={() => cycle(1)}
          aria-label="Next project"
        >
          <span className="ps-btn ps-btn--l2">R1</span>
          <span>Next</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="persona__stage"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="persona__head">
            <QuadPlate
              className="persona-num"
              viewBox="0 0 220 96"
              outline={personaShapes.number.red}
              fill={personaShapes.number.black}
            >
              <span>NO.{padIndex(index)}</span>
            </QuadPlate>
            <div className="persona__titles">
              <QuadPlate
                className="persona-name"
                viewBox="0 0 760 136"
                outline={personaShapes.name.red}
                fill={personaShapes.name.black}
              >
                <h2>{heading}</h2>
              </QuadPlate>
              {project.heading && (
                <p className="visually-hidden">{project.title}</p>
              )}
              <p className="persona-blurb">{project.blurb}</p>
              <ul className="persona-tags" aria-label="Technologies">
                {project.tech.map((item) => (
                  <li key={item}>
                    <QuadPlate
                      className="persona-tag"
                      viewBox="0 0 180 64"
                      outline={personaShapes.tag.outline}
                      fill={personaShapes.tag.fill}
                    >
                      <span>{item}</span>
                    </QuadPlate>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <ProjectFrame
            project={project}
            onOpenImage={setActiveImage}
          />
        </motion.div>
      </AnimatePresence>

      {activeImage && (
        <Lightbox
          src={activeImage.src}
          alt={activeImage.alt}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  )
}

function ProjectFrame({
  project,
  onOpenImage,
}: {
  project: Project
  onOpenImage: (image: ActiveImage) => void
}) {
  return (
    <QuadPlate
      className="persona-box"
      viewBox="0 0 800 440"
      outline={personaShapes.box.red}
      fill={personaShapes.box.black}
    >
      <div className="persona-box__inner">
        <p className="persona-box__text">{project.description}</p>
        {project.note && <p className="persona-box__note">{project.note}</p>}
        {project.images.length > 0 && (
          <div className="persona-box__shots">
            {project.images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                tabIndex={0}
                onClick={() => onOpenImage(image)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    event.stopPropagation()
                    onOpenImage(image)
                  }
                }}
              />
            ))}
          </div>
        )}
        <a
          className="persona-box__next"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="persona-box__next-label">View Project</span>
          <span className="persona-box__next-name">{project.linkLabel}</span>
        </a>
      </div>
    </QuadPlate>
  )
}
