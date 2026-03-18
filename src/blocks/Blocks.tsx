import './blocks.css'

/* ── Header Large ────────────────────────────────────────────────────────── */

export function HeaderLarge() {
  return (
    <section className="sb-block sb-block-header-large">
      <img
        className="sb-block-header-large__bg"
        src="https://picsum.photos/seed/hero/1440/500"
        alt=""
      />
      <div className="sb-block-header-large__overlay" />
      <div className="sb-block-header-large__content">
        <h1 className="sb-block-header-large__title">Sabbatical Program</h1>
        <p className="sb-block-header-large__subtitle">
          Take time to recharge, explore, and come back inspired. Learn about eligibility, planning resources, and how to make the most of your time away.
        </p>
        <button type="button" className="sb-block-header-large__btn">
          Get started
          <span className="sb-block-header-large__btn-arrow">&rarr;</span>
        </button>
      </div>
    </section>
  )
}

/* ── 2 Column Text ───────────────────────────────────────────────────────── */

export function TwoColumnText() {
  return (
    <section className="sb-block sb-block-2col-text">
      <div>
        <h2 className="sb-block-2col-text__col-title">Eligibility</h2>
        <p className="sb-block-2col-text__col-body">
          Full-time employees who have completed five or more consecutive years of service
          are eligible for a four-week paid sabbatical. The program resets every five years,
          so you can take advantage of it multiple times throughout your career. Part-time
          employees may qualify on a prorated basis — check with your HR partner for details.
        </p>
      </div>
      <div>
        <h2 className="sb-block-2col-text__col-title">How to Apply</h2>
        <p className="sb-block-2col-text__col-body">
          Start by having a conversation with your manager at least three months before your
          desired start date. Once you've aligned on timing, submit a request through the
          HR portal. Your manager and HR partner will review coverage plans and confirm
          approval within two weeks. We recommend planning early to ensure a smooth transition.
        </p>
      </div>
    </section>
  )
}

/* ── Image / Text Split ──────────────────────────────────────────────────── */

export function ImageTextSplit() {
  return (
    <section className="sb-block sb-block-split">
      <div className="sb-block-split__text">
        <h2 className="sb-block-split__title">Plan Your Time</h2>
        <p className="sb-block-split__body">
          Whether you want to travel, learn a new skill, volunteer, or simply rest — your
          sabbatical is yours to design. Past participants have hiked the Camino de Santiago,
          completed online certifications, written novels, and spent quality time with family.
        </p>
        <a className="sb-block-split__link">See sabbatical stories</a>
      </div>
      <img
        className="sb-block-split__image"
        src="https://picsum.photos/seed/split/720/400"
        alt=""
      />
    </section>
  )
}

/* ── 3 Card Image Links ──────────────────────────────────────────────────── */

const CARD_DATA = [
  {
    src: 'https://picsum.photos/seed/card1/710/522',
    title: 'Travel & Adventure',
    body: 'Explore new places and broaden your perspective with dedicated time to travel.',
  },
  {
    src: 'https://picsum.photos/seed/card2/710/522',
    title: 'Learning & Growth',
    body: 'Take a course, earn a certification, or dive deep into a subject you\'re passionate about.',
  },
  {
    src: 'https://picsum.photos/seed/card3/710/522',
    title: 'Rest & Wellbeing',
    body: 'Recharge your energy and return with renewed focus, creativity, and motivation.',
  },
]

export function ThreeCardImageLinks() {
  return (
    <section className="sb-block sb-block-3cards">
      {CARD_DATA.map((card, i) => (
        <div key={i} className="sb-block-3cards__card">
          <img className="sb-block-3cards__card-img" src={card.src} alt="" />
          <div className="sb-block-3cards__card-overlay">
            <h3 className="sb-block-3cards__card-title">{card.title}</h3>
            <p className="sb-block-3cards__card-body">{card.body}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ── Grey Separator ──────────────────────────────────────────────────────── */

export function GreySeparator() {
  return <div className="sb-block sb-block-separator" />
}
