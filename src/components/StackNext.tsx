type StackNextProps = {
  label: string
  onClick: () => void
}

function scrollStackedTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.querySelectorAll('.page-content').forEach((node) => {
    if (node instanceof HTMLElement) {
      node.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

export function StackNext({ label, onClick }: StackNextProps) {
  return (
    <button
      type="button"
      className="stack-next"
      onClick={() => {
        onClick()
        scrollStackedTop()
      }}
      aria-label={label}
    >
      <span>Next</span>
      <span className="ps-btn ps-btn--l2" aria-hidden="true">
        →
      </span>
    </button>
  )
}
