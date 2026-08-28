import { QuadPlate } from '../components/QuadPlate'
import { StencilName } from '../components/StencilName'
import { confidantShapes } from '../data/confidantShapes'
import { site } from '../data/content'

export function AboutSection() {
  return (
    <div className="confidant">
      <aside className="chat-bubble" aria-label="Profile note">
        <p className="chat-bubble__name">
          <span className="visually-hidden">{site.name}</span>
          <StencilName text={site.name.toUpperCase()} />
        </p>
        <QuadPlate
          className="chat-bubble__plate"
          viewBox="0 0 640 280"
          outline={confidantShapes.bubble.outline}
          fill={confidantShapes.bubble.fill}
        >
          <p className="chat-bubble__text">{site.blurb}</p>
        </QuadPlate>
        <span className="chat-bubble__tail" aria-hidden="true" />
      </aside>

      <article className="confidant-card" aria-label="About Chris Lum">
        <div className="confidant-card__frame">
          <span className="confidant-card__frame-layer confidant-card__frame-layer--white" aria-hidden="true" />
          <span className="confidant-card__frame-layer confidant-card__frame-layer--dark" aria-hidden="true" />
          <div className="confidant-card__photo">
            <img src={site.photo.src} alt={site.photo.alt} />
          </div>
        </div>

        <div className="confidant-card__stack">
          <QuadPlate
            className="confidant-card__name"
            viewBox="0 0 560 80"
            outline={confidantShapes.name.outline}
            fill={confidantShapes.name.fill}
          >
            <h2>{site.name}</h2>
          </QuadPlate>

          <QuadPlate
            className="confidant-card__role"
            viewBox="0 0 560 110"
            outline={confidantShapes.role.outline}
            fill={confidantShapes.role.fill}
          >
            <div className="confidant-card__role-left">
              <p className="confidant-card__role-copy">{site.role}</p>
            </div>
            <p className="confidant-card__year">
              <span className="confidant-card__year-label">Year</span>
              <span className="confidant-card__year-num">3</span>
            </p>
          </QuadPlate>

          <QuadPlate
            className="confidant-card__bio"
            viewBox="0 0 560 110"
            outline={confidantShapes.bio.outline}
            fill={confidantShapes.bio.fill}
          >
            <p>
              <span className="confidant-card__arrow" aria-hidden="true" />
              {site.bio}
            </p>
          </QuadPlate>
        </div>
      </article>
    </div>
  )
}
