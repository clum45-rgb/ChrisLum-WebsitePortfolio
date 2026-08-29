import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personaShapes } from '../data/personaShapes'
import { projects, type Project } from '../data/content'
import { Lightbox } from './Lightbox'
import { QuadPlate } from './QuadPlate'
import { StackNext } from './StackNext'

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
          <span className="ps-btn ps-btn--l2" aria-hidden="true">
            ←
          </span>
          <span>Prev</span>
        </button>
        <button
          type="button"
          className="persona__tab"
          onClick={() => cycle(1)}
          aria-label="Next project"
        >
          <span className="ps-btn ps-btn--l2" aria-hidden="true">
            →
          </span>
          <span>Next</span>
        </button>
        <ol className="persona__dots" aria-label="Project pages">
          {projects.map((item, itemIndex) => (
            <li key={item.id}>
              <button
                type="button"
                className={[
                  'persona__dot',
                  itemIndex === index && 'is-active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`Go to project ${itemIndex + 1}: ${item.heading ?? item.title}`}
                aria-current={itemIndex === index ? 'true' : undefined}
                onClick={() => setIndex(itemIndex)}
              />
            </li>
          ))}
        </ol>
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

          <ProjectFrame project={project} />
          <ProjectMedia
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

      {!activeImage && (
        <StackNext label="Next project" onClick={() => cycle(1)} />
      )}
    </section>
  )
}

function ProjectFrame({ project }: { project: Project }) {
  return (
    <QuadPlate
      className="persona-box"
      viewBox="0 0 800 440"
      outline={personaShapes.box.red}
      fill={personaShapes.box.black}
    >
      <div className="persona-box__inner">
        <div className="persona-box__copy">
          <span className="persona-box__avoid" aria-hidden="true" />
          <p className="persona-box__text">{project.description}</p>
          {project.note && <p className="persona-box__note">{project.note}</p>}
        </div>
        <a
          className="persona-cta"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkLabel}
        </a>
      </div>
    </QuadPlate>
  )
}

function ProjectMedia({
  project,
  onOpenImage,
}: {
  project: Project
  onOpenImage: (image: ActiveImage) => void
}) {
  return (
    <aside className="persona__media" aria-label={`${project.title} media`}>
      <ProjectDemo project={project} />
      <ProjectGallery project={project} onOpenImage={onOpenImage} />
    </aside>
  )
}

function isHostedVideoFile(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url)
}

function ProjectDemo({ project }: { project: Project }) {
  const src = project.demoVideo
  const playsInPage = Boolean(src && isHostedVideoFile(src))

  const inner = (
    <div className="persona-demo__inner">
      <span className="persona-demo__play" aria-hidden="true" />
      <p className="persona-demo__kicker">Demo</p>
      <p className="persona-demo__copy">
        {src ? 'Watch demo' : 'Coming soon'}
      </p>
    </div>
  )

  return (
    <QuadPlate
      className={`persona-demo${playsInPage ? ' persona-demo--video' : ''}`}
      viewBox="0 0 800 440"
      outline={personaShapes.media.red}
      fill={personaShapes.media.black}
    >
      {playsInPage && src ? (
        <video
          key={src}
          className="persona-demo__video"
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-label={`${project.heading ?? project.title} demo`}
        />
      ) : src ? (
        <a
          className="persona-demo__link"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </QuadPlate>
  )
}

function ProjectGallery({
  project,
  onOpenImage,
}: {
  project: Project
  onOpenImage: (image: ActiveImage) => void
}) {
  return (
    <QuadPlate
      className="persona-gallery"
      viewBox="0 0 800 440"
      outline={personaShapes.media.red}
      fill={personaShapes.media.black}
    >
      <div className="persona-gallery__inner">
        <p className="persona-gallery__kicker">Gallery</p>
        {project.images.length > 0 ? (
          <div className="persona-gallery__grid">
            {project.images.map((image) => (
              <button
                key={image.src}
                type="button"
                className="persona-gallery__shot"
                onClick={() => onOpenImage(image)}
                aria-label={`Enlarge ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} />
              </button>
            ))}
          </div>
        ) : (
          <p className="persona-gallery__empty">Coming soon</p>
        )}
      </div>
    </QuadPlate>
  )
}
