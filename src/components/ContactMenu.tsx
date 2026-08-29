import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { StencilName } from './StencilName'

type ContactItem = {
  id: string
  label: string
  description: string
  href: string
  action: string
  external?: boolean
  icon: 'mail' | 'github' | 'linkedin'
}

const items: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    description: 'Click to send me an email at: clum45@uw.edu',
    href: `mailto:${site.email}`,
    action: 'MAIL',
    icon: 'mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Opens a link to my github repositories.',
    href: site.github,
    action: 'CODE',
    external: true,
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Feel free to connect with me :)',
    href: site.linkedin,
    action: 'LINK',
    external: true,
    icon: 'linkedin',
  },
]

function ItemIcon({ kind }: { kind: ContactItem['icon'] }) {
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3.2 5.4h17.6c.9 0 1.6.7 1.6 1.6v10c0 .9-.7 1.6-1.6 1.6H3.2c-.9 0-1.6-.7-1.6-1.6v-10c0-.9.7-1.6 1.6-1.6zm.4 2.1 8.4 5.4 8.4-5.4v-.3H3.6zm16.8 9.1V9.3l-8.4 5.4-8.4-5.4v7.3z"
        />
      </svg>
    )
  }

  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1.6C6.2 1.6 1.5 6.3 1.5 12.1c0 4.6 3 8.6 7.2 10 .5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.4.9 0 1.8.1 2.6.4 2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10C22.5 6.3 17.8 1.6 12 1.6z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.6 3.2h14.8C21 3.2 22 4.2 22 5.6v12.8c0 1.4-1 2.4-2.6 2.4H4.6C3.2 20.8 2 19.8 2 18.4V5.6C2 4.2 3.2 3.2 4.6 3.2zM8.3 18V10.7H5.7V18h2.6zm-1.3-8.3c.8 0 1.5-.6 1.5-1.5S7.8 6.7 7 6.7s-1.5.6-1.5 1.5.7 1.5 1.5 1.5zM18.3 18v-4c0-2.1-1.1-3.1-2.8-3.1-1.3 0-1.9.7-2.2 1.2h0V10.7h-2.6c0 1.1 0 7.3 0 7.3h2.6v-4.1c0-.2 0-.4.1-.6.2-.4.6-.9 1.3-.9 1 0 1.4.7 1.4 1.8V18h2.2z"
      />
    </svg>
  )
}

export function ContactMenu() {
  const [selected, setSelected] = useState(0)
  const active = items[selected]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        setSelected((index) => (index + 1) % items.length)
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelected((index) => (index - 1 + items.length) % items.length)
        return
      }

      if (event.key === 'Enter') {
        const current = items[selected]
        if (!current) {
          return
        }
        event.preventDefault()
        if (current.external) {
          window.open(current.href, '_blank', 'noopener,noreferrer')
          return
        }
        window.location.assign(current.href)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  return (
    <section className="item-menu" aria-label="Contacts">
      <div className="item-menu__smear" aria-hidden="true" />
      <div className="item-menu__panel">
        <header className="item-menu__header">
          <h2 className="item-menu__title">
            <span className="visually-hidden">Contacts</span>
            <StencilName text="CONTACT" className="item-menu__stencil" alternate />
          </h2>
        </header>

        <ul className="item-menu__list" role="listbox" aria-label="Contact links">
          {items.map((item, index) => {
            const isSelected = index === selected

            return (
              <li key={item.id} className="item-menu__slot">
                <a
                  className={['item-menu__row', isSelected && 'is-selected']
                    .filter(Boolean)
                    .join(' ')}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelected(index)}
                  onFocus={() => setSelected(index)}
                >
                  <span className="item-menu__body">
                    <span className="item-menu__icon">
                      <ItemIcon kind={item.icon} />
                    </span>
                    <span className="item-menu__label">{item.label}</span>
                    <span className="item-menu__qty">{item.action}</span>
                  </span>
                  <span className="item-menu__spike" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <p className="item-menu__desc">{active.description}</p>
      </div>
    </section>
  )
}
