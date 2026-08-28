import { useState } from 'react'
import { Lightbox } from '../components/Lightbox'
import { projects } from '../data/content'

type ActiveImage = {
  src: string
  alt: string
}

export function ProjectsSection() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)

  return (
    <>
      <h2 className="section-panel__title">Projects</h2>
      {projects.map((project) => (
        <article key={project.id} className="project-card">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="section-panel__text">{project.description}</p>
          {project.note && (
            <p className="section-panel__note">{project.note}</p>
          )}
          <div className="project-card__images">
            {project.images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                tabIndex={0}
                onClick={() => setActiveImage(image)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    event.stopPropagation()
                    setActiveImage(image)
                  }
                }}
              />
            ))}
          </div>
          <a
            className="project-card__link"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.linkLabel}
          </a>
        </article>
      ))}
      {activeImage && (
        <Lightbox
          src={activeImage.src}
          alt={activeImage.alt}
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  )
}
