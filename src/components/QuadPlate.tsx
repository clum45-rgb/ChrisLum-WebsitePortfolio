import type { ReactNode } from 'react'

type QuadPlateProps = {
  className: string
  viewBox: string
  outline: string
  fill: string
  children?: ReactNode
}

export function QuadPlate({
  className,
  viewBox,
  outline,
  fill,
  children,
}: QuadPlateProps) {
  return (
    <div className={`quad-plate ${className}`}>
      <svg
        className="quad-plate__outline"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points={outline} />
      </svg>
      <svg
        className="quad-plate__fill"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points={fill} />
      </svg>
      {children ? <div className="quad-plate__content">{children}</div> : null}
    </div>
  )
}
