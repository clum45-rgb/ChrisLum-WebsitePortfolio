import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <article className="section-page">
      <div className="section-page__inner">{children}</div>
    </article>
  )
}
