import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={['section-frame', className].filter(Boolean).join(' ')}>
      <div className="section-frame__red" aria-hidden="true" />
      <article className="section-page">
        <div className="section-page__inner">{children}</div>
      </article>
    </div>
  )
}
