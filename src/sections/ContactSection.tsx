import { SocialLinks } from '../components/SocialLinks'
import { site } from '../data/content'

export function ContactSection() {
  return (
    <>
      <h2 className="section-panel__title">Contact</h2>
      <p className="section-panel__text">
        Reach out via email or connect on GitHub and LinkedIn.
      </p>
      <ul className="contact-links">
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
      <SocialLinks
        email={site.email}
        github={site.github}
        linkedin={site.linkedin}
      />
      <p className="section-panel__footer">{site.footer}</p>
    </>
  )
}
