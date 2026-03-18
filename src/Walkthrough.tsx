import { useState } from 'react'
import './walkthrough.css'

const STEPS = [
  {
    title: 'Welcome to the Sitebuilder Demo',
    body: "I'll walk you through how the AI-powered page builder works. You can dismiss this guide at any time. If you close it by accident, just refresh the browser to bring it back.",
    pointer: 'center' as const,
  },
  {
    title: 'This is the Sitebuilder',
    body: 'On the left is the page canvas where content gets built. On the right is the Widgets panel where you can browse available page blocks. At the bottom is the action bar.',
    pointer: 'center' as const,
  },
  {
    title: 'Step 1: Open HubGPT',
    body: 'Click the "Ask HubGPT" button in the bottom-right corner to open the AI chat panel.',
    pointer: 'bottom-right' as const,
  },
  {
    title: 'Step 2: Send the first prompt',
    body: 'A prompt is pre-filled for you. Click the send button (or press Enter) to start building the page.',
    pointer: 'right' as const,
  },
  {
    title: 'Step 3: Watch the page build',
    body: 'Skeleton loaders will appear on the canvas, then the real content blocks fade in with a gradient reveal effect.',
    pointer: 'left' as const,
  },
  {
    title: 'Step 4: Send the second prompt',
    body: 'A second prompt auto-fills. Send it to add more sections to the page.',
    pointer: 'right' as const,
  },
  {
    title: "You're all set!",
    body: 'newchat',
    pointer: 'center' as const,
  },
]

interface WalkthroughProps {
  currentDemoStep: number
  chatOpen: boolean
  isAnimating: boolean
}

export function Walkthrough({ currentDemoStep, chatOpen, isAnimating }: WalkthroughProps) {
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  // Auto-advance based on user actions
  const effectiveStep = (() => {
    if (step === 2 && chatOpen) return 3
    if (step === 3 && currentDemoStep >= 1 && !isAnimating) return 5
    if (step === 4 && currentDemoStep >= 1 && !isAnimating) return 5
    if (step === 5 && currentDemoStep >= 2 && !isAnimating) return 6
    return step
  })()

  // Sync if auto-advanced
  if (effectiveStep !== step) {
    setTimeout(() => setStep(effectiveStep), 0)
  }

  const current = STEPS[effectiveStep]
  const isLast = effectiveStep === STEPS.length - 1

  return (
    <div className={`wt-card wt-card--${current.pointer}`}>
      <div className="wt-card__header">
        <span className="wt-card__step-badge">
          {effectiveStep === 0 ? '👋' : effectiveStep === STEPS.length - 1 ? '🎉' : `${effectiveStep} of ${STEPS.length - 2}`}
        </span>
        <button
          type="button"
          className="wt-card__dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss walkthrough"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <h4 className="wt-card__title">{current.title}</h4>
      <p className="wt-card__body">
        {current.body === 'newchat' ? (
          <>
            Use the{' '}
            <span className="wt-card__inline-icon">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 2.5l-2 2M11.5 4.5L6 10H4v-2l5.5-5.5M11.5 4.5l2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 8.5V12a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 12V4.5A1.5 1.5 0 014 3h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {' '}New Chat
            </span>
            {' '}button in the chat header to reset and run the demo again. Enjoy!
          </>
        ) : current.body}
      </p>
      <div className="wt-card__actions">
        {effectiveStep > 0 && !isLast && (
          <button
            type="button"
            className="wt-card__btn wt-card__btn--secondary"
            onClick={() => setStep(effectiveStep - 1)}
          >
            Back
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            className="wt-card__btn wt-card__btn--primary"
            onClick={() => setStep(effectiveStep + 1)}
          >
            {effectiveStep === 0 ? "Let's go" : 'Next'}
          </button>
        ) : (
          <button
            type="button"
            className="wt-card__btn wt-card__btn--primary"
            onClick={() => setDismissed(true)}
          >
            Got it
          </button>
        )}
      </div>
    </div>
  )
}
