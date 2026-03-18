import './skeletons.css'

/* ── Header Large Skeleton ───────────────────────────────────────────────── */

export function HeaderLargeSkeleton() {
  return (
    <div className="sb-skel sb-skel-header-large">
      <div className="sb-skel-header-large__content">
        <div className="sb-skel__bone sb-skel-header-large__title" />
        <div className="sb-skel__bone sb-skel-header-large__subtitle" />
        <div className="sb-skel__bone sb-skel-header-large__subtitle sb-skel-header-large__subtitle--short" />
        <div className="sb-skel__bone sb-skel-header-large__btn" />
      </div>
    </div>
  )
}

/* ── 2 Column Text Skeleton ──────────────────────────────────────────────── */

export function TwoColumnTextSkeleton() {
  return (
    <div className="sb-skel sb-skel-2col">
      <div className="sb-skel-2col__col">
        <div className="sb-skel__bone sb-skel-2col__heading" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line sb-skel-2col__line--short" />
      </div>
      <div className="sb-skel-2col__col">
        <div className="sb-skel__bone sb-skel-2col__heading" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line" />
        <div className="sb-skel__bone sb-skel-2col__line sb-skel-2col__line--short" />
      </div>
    </div>
  )
}

/* ── Image / Text Split Skeleton ─────────────────────────────────────────── */

export function ImageTextSplitSkeleton() {
  return (
    <div className="sb-skel sb-skel-split">
      <div className="sb-skel-split__text">
        <div className="sb-skel__bone sb-skel-split__heading" />
        <div className="sb-skel__bone sb-skel-split__line" />
        <div className="sb-skel__bone sb-skel-split__line" />
        <div className="sb-skel__bone sb-skel-split__line sb-skel-split__line--short" />
        <div className="sb-skel__bone sb-skel-split__link" />
      </div>
      <div className="sb-skel__bone sb-skel-split__image" />
    </div>
  )
}

/* ── 3 Card Image Links Skeleton ─────────────────────────────────────────── */

export function ThreeCardImageLinksSkeleton() {
  return (
    <div className="sb-skel sb-skel-3cards">
      {[0, 1, 2].map(i => (
        <div key={i} className="sb-skel-3cards__card">
          <div className="sb-skel__bone sb-skel-3cards__img" />
          <div className="sb-skel-3cards__text">
            <div className="sb-skel__bone sb-skel-3cards__title" />
            <div className="sb-skel__bone sb-skel-3cards__line" />
            <div className="sb-skel__bone sb-skel-3cards__line sb-skel-3cards__line--short" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Grey Separator Skeleton ─────────────────────────────────────────────── */

export function GreySeparatorSkeleton() {
  return <div className="sb-skel sb-skel-separator" />
}
