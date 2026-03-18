import { useState, useRef, useEffect } from 'react'
import './playground.css'
import { HubHeader } from './components/HubHeader/HubHeader'
import {
  HeaderLarge,
  TwoColumnText,
  ImageTextSplit,
  ThreeCardImageLinks,
} from './blocks/Blocks'
import { Walkthrough } from './Walkthrough'
import {
  HeaderLargeSkeleton,
  TwoColumnTextSkeleton,
  ImageTextSplitSkeleton,
  ThreeCardImageLinksSkeleton,
} from './blocks/Skeletons'

const WIDGET_CATALOG: Record<string, string[]> = {
  'Headers': [
    'Header Large',
    'Header Medium',
    'Header Small',
    'Header Blue Panel',
    'Header 2 Cards',
    'Header 3 Card',
    'Header 4 Card',
    'Header Panel',
  ],
  'Separators': [
    'Grey Separator',
    'Line Separator',
  ],
  'Text': [
    'Take Action Now',
    'CTA',
    'Floating Footer',
    '1 Column',
    '2 Column',
    '3 Column',
    '4 Column',
    '3/9 Split',
    '8/4 Split',
    '2 Cards Top Border',
    '2 Cards Left Border',
    '4 Cards',
  ],
  'Images & Text': [
    'Shop Now',
    '2 Col w/ Icons',
    '3 Col w/ Icons',
    '4 Col w/ Icons',
    '2 Col Cards',
    '1 Col Card',
    '2 Card Image Links',
    '3 Card Image Links',
    'Image w/ Caption',
    'Split',
    'Full w/ Image',
    'Full Width Image w/ Text',
    'Text / Image',
    'Image / Text',
    '3 Col Image & Text',
    '2 Col Image & Text',
    'Profile',
    '2 Profiles',
    '3 Profiles',
    '4 Profiles',
    'Text w/ Profile',
  ],
  'Interactive': [
    '2 Col Image Accordion',
    '3 Col Image Accordion',
    'Accordion',
    'Tab',
    'Tab (Block)',
    'Timeline',
    'Timeline (Grey)',
  ],
  'Maps': [
    'Map',
  ],
  'Video': [
    'Centered',
    'Left w/ Text',
    'Right w/ Text',
  ],
  'Alerts': [
    'Restricted Content',
    'Warning',
    'FYI',
    'Success',
  ],
  'News': [
    'News Component',
  ],
  'Custom': [
    'Custom HTML',
    'Embed Code',
    'iFrame',
  ],
  'Dgrp': [
    'Design Group Template',
  ],
}

/* ── Demo Script ─────────────────────────────────────────────────────────── */

const DEMO_STEPS = [
  {
    prompt: 'Build me a sabbatical program page with a large hero header, then a two-column section covering eligibility and how to apply.',
    botReply: "Great choice! I'll build a sabbatical page for you. Starting with a hero header and a two-column text section...",
    // Blocks revealed in this step: header + separator + 2col
    blocks: ['header', '2col'] as const,
  },
  {
    prompt: 'Now add a section about planning your time with an image, and finish with three cards for travel, learning, and wellbeing.',
    botReply: "Perfect — I'll add an image split section and three feature cards to round out the page.",
    blocks: ['split', '3cards'] as const,
  },
]

type BlockId = 'header' | '2col' | 'split' | '3cards'
type BlockState = 'hidden' | 'skeleton' | 'visible'

const ALL_BLOCKS: BlockId[] = ['header', '2col', 'split', '3cards']

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
}

export function Playground() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [demoStep, setDemoStep] = useState(0)
  const [blockStates, setBlockStates] = useState<Record<BlockId, BlockState>>(
    () => Object.fromEntries(ALL_BLOCKS.map(b => [b, 'hidden'])) as Record<BlockId, BlockState>
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Pre-fill the next prompt when chat opens or after a step completes
  useEffect(() => {
    if (chatOpen && demoStep < DEMO_STEPS.length && !isAnimating) {
      setInputValue(DEMO_STEPS[demoStep].prompt)
    }
  }, [chatOpen, demoStep, isAnimating])

  const toggleCategory = (cat: string) => {
    setOpenCategory(prev => (prev === cat ? null : cat))
  }

  const runDemoStep = (step: typeof DEMO_STEPS[number], stepIndex: number) => {
    setIsAnimating(true)
    const userMsg = inputValue.trim()
    setInputValue('')

    // 1. Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])

    // 2. Bot typing delay → bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: step.botReply }])

      // 3. Show skeletons for this step's blocks
      setTimeout(() => {
        setBlockStates(prev => {
          const next = { ...prev }
          for (const b of step.blocks) {
            next[b] = 'skeleton'
          }
          return next
        })

        // Scroll canvas to show new content
        if (canvasRef.current) {
          setTimeout(() => {
            canvasRef.current?.scrollTo({ top: canvasRef.current.scrollHeight, behavior: 'smooth' })
          }, 100)
        }

        // 4. Reveal real blocks one by one with staggered timing
        step.blocks.forEach((blockId, i) => {
          setTimeout(() => {
            setBlockStates(prev => ({ ...prev, [blockId]: 'visible' }))

            // Scroll as each block reveals
            if (canvasRef.current) {
              setTimeout(() => {
                canvasRef.current?.scrollTo({ top: canvasRef.current.scrollHeight, behavior: 'smooth' })
              }, 100)
            }

            // If last block in step, mark step complete
            if (i === step.blocks.length - 1) {
              setTimeout(() => {
                setDemoStep(stepIndex + 1)
                setIsAnimating(false)
              }, 400)
            }
          }, 1200 + i * 800)
        })
      }, 600)
    }, 1000)
  }

  const handleSend = () => {
    if (!inputValue.trim() || isAnimating) return

    if (demoStep < DEMO_STEPS.length) {
      runDemoStep(DEMO_STEPS[demoStep], demoStep)
    } else {
      // After demo is done, just echo messages
      const userMsg = inputValue.trim()
      setInputValue('')
      setMessages(prev => [...prev, { role: 'user', text: userMsg }])
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: 'bot', text: "Your sabbatical page is complete! You can continue to refine it using the widgets panel, or ask me for more changes." },
        ])
      }, 800)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setDemoStep(0)
    setBlockStates(
      Object.fromEntries(ALL_BLOCKS.map(b => [b, 'hidden'])) as Record<BlockId, BlockState>
    )
    setInputValue('')
    setIsAnimating(false)
  }

  const renderBlock = (id: BlockId, RealBlock: React.FC, SkeletonBlock: React.FC) => {
    const state = blockStates[id]
    if (state === 'hidden') return null
    if (state === 'skeleton') return <SkeletonBlock key={`${id}-skel`} />
    return <div key={id} className="sb-block--reveal"><RealBlock /></div>
  }

  return (
    <div className={`sb-page ${expanded ? 'sb-page--expanded' : ''}`}>

      {/* ── Hub Header ──────────────────────────────────────── */}
      <div className="sb-header">
        <HubHeader
          avatarSrc="https://i.pravatar.cc/80"
          avatarProgress={50}
          notificationCount={1}
        />
      </div>

      {/* ── Editor Body ─────────────────────────────────────── */}
      <div className={`sb-body ${expanded ? 'sb-body--expanded' : ''}`}>

        {/* ── Main Canvas ─────────────────────────────────── */}
        <div className="sb-canvas-area">
          {/* Component menu — left edge */}
          <div className="sb-comp-menu">
            <button type="button" className="sb-comp-menu__btn sb-comp-menu__btn--move" aria-label="Move">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0.5v13M0.5 7h13M7 0.5L5 2.5M7 0.5L9 2.5M7 13.5L5 11.5M7 13.5L9 11.5M0.5 7L2.5 5M0.5 7L2.5 9M13.5 7L11.5 5M13.5 7L11.5 9" stroke="#767676" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button type="button" className="sb-comp-menu__btn sb-comp-menu__btn--duplicate" aria-label="Duplicate">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="0.5" y="2.5" width="9" height="9" rx="1" stroke="#767676"/>
                <path d="M4.5 2.5V1.5a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 01-1 1h-1" stroke="#767676"/>
              </svg>
            </button>
            <button type="button" className="sb-comp-menu__btn sb-comp-menu__btn--color" aria-label="Color">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M6 1L1 8a5 5 0 1010 0L6 1z" stroke="#767676" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button type="button" className="sb-comp-menu__btn sb-comp-menu__btn--responsive" aria-label="Responsive">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="0.5" y="2.5" width="13" height="9" rx="1" stroke="#767676"/>
                <path d="M5 13.5h4" stroke="#767676" strokeLinecap="round"/>
              </svg>
            </button>
            <button type="button" className="sb-comp-menu__btn sb-comp-menu__btn--close" aria-label="Remove">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#767676" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Page canvas */}
          <div className="sb-canvas" ref={canvasRef}>
            {/* Expand arrow */}
            <button type="button" className="sb-canvas__expand" aria-label={expanded ? 'Exit fullscreen' : 'Expand'} onClick={() => setExpanded(e => !e)}>
              {expanded ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 1v5H0M11 15v-5h5" stroke="#A2A2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0 6l6-6M16 10l-6 6" stroke="#A2A2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 1h5v5M6 15H1v-5" stroke="#A2A2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 1L9 7M1 15l6-6" stroke="#A2A2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* Demo blocks — driven by blockStates */}
            {renderBlock('header', HeaderLarge, HeaderLargeSkeleton)}
            {renderBlock('2col', TwoColumnText, TwoColumnTextSkeleton)}
            {renderBlock('split', ImageTextSplit, ImageTextSplitSkeleton)}
            {renderBlock('3cards', ThreeCardImageLinks, ThreeCardImageLinksSkeleton)}
          </div>
        </div>

        {/* ── Widgets Sidebar ─────────────────────────────── */}
        <aside className={`sb-sidebar ${chatOpen ? 'sb-sidebar--hidden' : ''}`}>
          <div className="sb-sidebar__header">
            <span className="sb-sidebar__label">PAGE TITLE</span>
            <h2 className="sb-sidebar__title">Widgets</h2>
          </div>
          <div className="sb-sidebar__categories">
            {Object.entries(WIDGET_CATALOG).map(([cat, widgets]) => (
              <div key={cat} className="sb-accordion">
                <button
                  type="button"
                  className="sb-accordion__trigger"
                  onClick={() => toggleCategory(cat)}
                  aria-expanded={openCategory === cat}
                >
                  <span className="sb-accordion__label">{cat}</span>
                  <svg
                    className={`sb-accordion__chevron ${openCategory === cat ? 'sb-accordion__chevron--open' : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path d="M1 1l4 4 4-4" stroke="#111820" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openCategory === cat && (
                  <div className="sb-accordion__content">
                    <ul className="sb-widget-list">
                      {widgets.map(widget => (
                        <li key={widget} className="sb-widget-list__item">
                          <button type="button" className="sb-widget-list__btn">
                            {widget}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Chat Panel ──────────────────────────────────── */}
        <aside className={`sb-chat ${chatOpen ? 'sb-chat--open' : ''}`}>
          {/* Chat Header */}
          <div className="sb-chat__header">
            <div className="sb-chat__header-brand">
              <svg className="sb-chat__header-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.27 11.29a1.13 1.13 0 01.71 0l.12.04a.75.75 0 00.47-1.42l-.12-.04a2.63 2.63 0 00-1.82 0l-.12.04a.75.75 0 00.47 1.42l.12-.04zM7.73 11.29a1.13 1.13 0 00-.71 0l-.12.04a.75.75 0 01-.47-1.42l.12-.04a2.63 2.63 0 011.82 0l.12.04a.75.75 0 01-.47 1.42l-.12-.04z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.97 2.26a.75.75 0 10-1.45.39l.42 1.58A5.75 5.75 0 002.75 8.75v4.5A5.25 5.25 0 007.75 18.25h4.5a5.25 5.25 0 005-5v-4.5a5.75 5.75 0 00-2.83-4.93l.4-1.56a.75.75 0 00-1.45-.39l-.66 1.52c-.15-.01-.3-.01-.46-.01h-4.5c-.14 0-.27.01-.4.02L6.97 2.26zM4.75 8.75A3 3 0 017.75 5.75h4.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-4.5a3 3 0 01-3-3v-4.5z" fill="currentColor"/>
                <path d="M2.05 8A6.8 6.8 0 002 8.75v4.5c0 .25.02.5.05.75H2a2 2 0 01-2-2v-2a2 2 0 012-2h.05zM17.95 14c.03-.25.05-.5.05-.75v-4.5c0-.25-.02-.5-.05-.75H18a2 2 0 012 2v2a2 2 0 01-2 2h-.05z" fill="currentColor"/>
              </svg>
              <span className="sb-chat__header-title">
                Mega<strong>AI</strong>
              </span>
              <svg className="sb-chat__header-badge" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#3665f3"/>
                <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="sb-chat__header-actions">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="sb-chat__new-chat"
                  onClick={handleNewChat}
                  aria-label="New chat"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 2.5l-2 2M11.5 4.5L6 10H4v-2l5.5-5.5M11.5 4.5l2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 8.5V12a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 12V4.5A1.5 1.5 0 014 3h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <button
                type="button"
                className="sb-chat__close"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="sb-chat__messages">
            {messages.length === 0 && (
              <div className="sb-chat__welcome">
                <div className="sb-chat__welcome-icon">
                  <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
                    <path d="M12.27 11.29a1.13 1.13 0 01.71 0l.12.04a.75.75 0 00.47-1.42l-.12-.04a2.63 2.63 0 00-1.82 0l-.12.04a.75.75 0 00.47 1.42l.12-.04zM7.73 11.29a1.13 1.13 0 00-.71 0l-.12.04a.75.75 0 01-.47-1.42l.12-.04a2.63 2.63 0 011.82 0l.12.04a.75.75 0 01-.47 1.42l-.12-.04z" fill="#3665f3"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.97 2.26a.75.75 0 10-1.45.39l.42 1.58A5.75 5.75 0 002.75 8.75v4.5A5.25 5.25 0 007.75 18.25h4.5a5.25 5.25 0 005-5v-4.5a5.75 5.75 0 00-2.83-4.93l.4-1.56a.75.75 0 00-1.45-.39l-.66 1.52c-.15-.01-.3-.01-.46-.01h-4.5c-.14 0-.27.01-.4.02L6.97 2.26zM4.75 8.75A3 3 0 017.75 5.75h4.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-4.5a3 3 0 01-3-3v-4.5z" fill="#3665f3"/>
                    <path d="M2.05 8A6.8 6.8 0 002 8.75v4.5c0 .25.02.5.05.75H2a2 2 0 01-2-2v-2a2 2 0 012-2h.05zM17.95 14c.03-.25.05-.5.05-.75v-4.5c0-.25-.02-.5-.05-.75H18a2 2 0 012 2v2a2 2 0 01-2 2h-.05z" fill="#3665f3"/>
                  </svg>
                </div>
                <h3 className="sb-chat__welcome-title">Ask MegaAI about<br /><span className="sb-chat__welcome-highlight">building your site</span></h3>
                <p className="sb-chat__welcome-desc">
                  Describe the page you want to build and I'll assemble the widgets for you.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`sb-chat__msg ${msg.role === 'user' ? 'sb-chat__msg--user' : 'sb-chat__msg--bot'}`}
              >
                {msg.role === 'bot' && (
                  <div className="sb-chat__msg-avatar">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M12.27 11.29a1.13 1.13 0 01.71 0l.12.04a.75.75 0 00.47-1.42l-.12-.04a2.63 2.63 0 00-1.82 0l-.12.04a.75.75 0 00.47 1.42l.12-.04zM7.73 11.29a1.13 1.13 0 00-.71 0l-.12.04a.75.75 0 01-.47-1.42l.12-.04a2.63 2.63 0 011.82 0l.12.04a.75.75 0 01-.47 1.42l-.12-.04z" fill="#3665f3"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.97 2.26a.75.75 0 10-1.45.39l.42 1.58A5.75 5.75 0 002.75 8.75v4.5A5.25 5.25 0 007.75 18.25h4.5a5.25 5.25 0 005-5v-4.5a5.75 5.75 0 00-2.83-4.93l.4-1.56a.75.75 0 00-1.45-.39l-.66 1.52c-.15-.01-.3-.01-.46-.01h-4.5c-.14 0-.27.01-.4.02L6.97 2.26zM4.75 8.75A3 3 0 017.75 5.75h4.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-4.5a3 3 0 01-3-3v-4.5z" fill="#3665f3"/>
                      <path d="M2.05 8A6.8 6.8 0 002 8.75v4.5c0 .25.02.5.05.75H2a2 2 0 01-2-2v-2a2 2 0 012-2h.05zM17.95 14c.03-.25.05-.5.05-.75v-4.5c0-.25-.02-.5-.05-.75H18a2 2 0 012 2v2a2 2 0 01-2 2h-.05z" fill="#3665f3"/>
                    </svg>
                  </div>
                )}
                {msg.role === 'user' && (
                  <div className="sb-chat__msg-avatar sb-chat__msg-avatar--user">EP</div>
                )}
                <div className="sb-chat__msg-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="sb-chat__input-area">
            <div className="sb-chat__input-wrap">
              <textarea
                className="sb-chat__input"
                placeholder="Type a message"
                rows={3}
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 60) + 'px'
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <button
                type="button"
                className={`sb-chat__send ${inputValue.trim() ? 'sb-chat__send--active' : ''}`}
                onClick={handleSend}
                disabled={isAnimating}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 2L7 9M14 2l-4.5 12-2-5.5L2 6.5 14 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="sb-chat__disclaimer">
              For questions about using MegaAI responsibly see <a href="#">MegaAI FAQ</a>
            </p>
          </div>
        </aside>

      </div>

      {/* ── Bottom Menubar ──────────────────────────────────── */}
      <div className="sb-menubar">
        <div className="sb-menubar__actions">
          <button type="button" className="sb-menubar__btn sb-menubar__btn--outline">Go Back</button>
          <button type="button" className="sb-menubar__btn sb-menubar__btn--outline">Save &amp; Preview</button>
          <button type="button" className="sb-menubar__btn sb-menubar__btn--primary">Save as Draft</button>
          <button type="button" className="sb-menubar__btn sb-menubar__btn--primary">Ready for Approval</button>
          <button type="button" className="sb-menubar__btn sb-menubar__btn--primary">Save &amp; Publish</button>
        </div>
        <button
          type="button"
          className={`sb-menubar__btn sb-menubar__btn--megaai ${chatOpen ? 'sb-menubar__btn--megaai--active' : ''}`}
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className="sb-menubar__megaai-gradient" />
          <svg className="sb-menubar__megaai-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.27 11.29a1.13 1.13 0 01.71 0l.12.04a.75.75 0 00.47-1.42l-.12-.04a2.63 2.63 0 00-1.82 0l-.12.04a.75.75 0 00.47 1.42l.12-.04zM7.73 11.29a1.13 1.13 0 00-.71 0l-.12.04a.75.75 0 01-.47-1.42l.12-.04a2.63 2.63 0 011.82 0l.12.04a.75.75 0 01-.47 1.42l-.12-.04z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.97 2.26a.75.75 0 10-1.45.39l.42 1.58A5.75 5.75 0 002.75 8.75v4.5A5.25 5.25 0 007.75 18.25h4.5a5.25 5.25 0 005-5v-4.5a5.75 5.75 0 00-2.83-4.93l.4-1.56a.75.75 0 00-1.45-.39l-.66 1.52c-.15-.01-.3-.01-.46-.01h-4.5c-.14 0-.27.01-.4.02L6.97 2.26zM4.75 8.75A3 3 0 017.75 5.75h4.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-4.5a3 3 0 01-3-3v-4.5z" fill="currentColor"/>
            <path d="M2.05 8A6.8 6.8 0 002 8.75v4.5c0 .25.02.5.05.75H2a2 2 0 01-2-2v-2a2 2 0 012-2h.05zM17.95 14c.03-.25.05-.5.05-.75v-4.5c0-.25-.02-.5-.05-.75H18a2 2 0 012 2v2a2 2 0 01-2 2h-.05z" fill="currentColor"/>
          </svg>
          <span className="sb-menubar__megaai-label">Ask MegaAI</span>
        </button>
      </div>

      {/* ── Walkthrough Guide ──────────────────────────────── */}
      <Walkthrough
        currentDemoStep={demoStep}
        chatOpen={chatOpen}
        isAnimating={isAnimating}
      />

    </div>
  )
}
