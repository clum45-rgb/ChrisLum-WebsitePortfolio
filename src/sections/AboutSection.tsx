import { SocialLinks } from '../components/SocialLinks'
import { site } from '../data/content'

export function AboutSection() {
  return (
    <>
      <h2 className="section-panel__title">About Me</h2>
      <div className="about-header">
        <img
          className="about-header__photo"
          src={site.photo.src}
          alt={site.photo.alt}
        />
        <div className="about-header__meta">
          <p className="about-header__name">{site.name}</p>
          <p className="about-header__tagline">{site.tagline}</p>
        </div>
      </div>
      <p className="section-panel__text">{site.bio}</p>
      <SocialLinks
        email={site.email}
        github={site.github}
        linkedin={site.linkedin}
      />
    </>
  )
}
