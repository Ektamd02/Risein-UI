import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NotebookPen, X } from 'lucide-react'

interface Note { title: string; goal: string; decisions: string[]; sources: string[] }

/** Presenter notes for the product/tech team — explains the intent behind each page. */
const NOTES: [RegExp, Note][] = [
  [/^\/$/, {
    title: 'Homepage',
    goal: 'Answer “what can I do with Rise In?” in one screen, then split developers and ecosystems into their own journeys.',
    decisions: [
      'Hero uses the existing tagline (learn for free · ship real projects · get paid) instead of a new slogan.',
      'Audience split sits directly under the hero, not at the bottom of the page.',
      'Metrics are verified numbers only, set large and animated instead of being buried in paragraphs.',
      'Every section ends in a single clear next click.',
    ],
    sources: ['risein.com', 'risein.com/earn', 'risein.com/partner-with-us', 'risein.com/reach-web3-developers-india'],
  }],
  [/^\/opportunities$/, {
    title: 'Opportunities (Earn board)',
    goal: 'A product-style discovery surface: search, filter, sort and scan in seconds.',
    decisions: [
      'Filters live in the URL (?type=Hackathon&eco=monad), so nav links can deep-link into the board.',
      'On mobile the filters move into a bottom sheet with a live result count.',
      'Ecosystem landing pages on today’s site (/monad, /stellar…) become filtered views of this one board.',
      'The Job card is a labelled placeholder because no verified job listing was available.',
    ],
    sources: ['risein.com/earn', 'risein.com/monad', 'risein.com/midnight', 'risein.com/stellar'],
  }],
  [/^\/opportunities\//, {
    title: 'Opportunity detail',
    goal: 'Everything needed to decide and apply: reward, deadline and mode above the fold, with details in tabs.',
    decisions: ['Sticky apply rail on desktop and a sticky bottom bar on mobile.', 'Live countdown for open deadlines.', 'Anything unverified is shown as a dashed [PLACEHOLDER].'],
    sources: ['Linked on the page (source chip).'],
  }],
  [/^\/programs$/, {
    title: 'Programs & learning',
    goal: 'Bring courses, bootcamps and builder camps together in one catalogue with simple filters.',
    decisions: ['Level uses the site’s own Intro / Technical grouping.', 'Format and status are filter pills, not dropdowns.', 'Course catalogue stats (24 courses · 88 hours · 198,139 learners) are verified.'],
    sources: ['risein.com/programs', 'risein.com/courses'],
  }],
  [/^\/programs\//, {
    title: 'Program detail',
    goal: 'A reusable template. The Rust Bootcamp shows the fully populated version.',
    decisions: ['Curriculum is an accordion and the timeline is a stepper, so there are no long blocks of text.', 'Other programs fall back to the same layout, with placeholders where content is missing.'],
    sources: ['risein.com/programs/rust-bootcamp'],
  }],
  [/^\/ecosystems/, {
    title: 'For Ecosystems',
    goal: 'The B2B story: Rise In as a developer growth partner across the full lifecycle.',
    decisions: ['Lifecycle: Reach → Activate → Educate → Build → Fund → Retain, with each Rise In offering mapped to a stage.', 'Offerings are an interactive list, with details revealed on selection.', 'The host-a-hackathon platform features come from /host-your-hackathon.'],
    sources: ['risein.com/partner-with-us', 'risein.com/host-your-hackathon'],
  }],
  [/^\/case-studies\//, {
    title: 'Case study',
    goal: 'A reusable, metric-first template: challenge → approach → results → quote.',
    decisions: ['The Stellar story is fully populated. Aptos India and Stacks Goa use the same template.'],
    sources: ['Listed at the bottom of each case study.'],
  }],
  [/^\/community/, {
    title: 'Community & ambassadors',
    goal: 'Show what members do, what they get and how they grow.',
    decisions: ['Ambassador tracks: two are verified (Builder, Catalyst); the third is marked as a placeholder.', 'Five regions: Turkey, India, Vietnam, Indonesia, Philippines.'],
    sources: ['risein.com/stellar-ambassadors'],
  }],
  [/^\/blog/, {
    title: 'Insights',
    goal: 'An editorial hub with a featured story, category filters and a reading-width article layout.',
    decisions: ['Real article titles. Dates were not available, so they show as [DATE].', 'Only the Stacks Goa recap has a migrated body; the others show a migration placeholder.'],
    sources: ['risein.com/blog'],
  }],
]

export function PrototypeNotes() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const note = NOTES.find(([r]) => r.test(pathname))?.[1]
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-20 left-3 z-40 inline-flex lg:bottom-5 lg:left-5 items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-violet" aria-label="Open prototype notes">
        <NotebookPen size={14} /> <span className="hidden sm:inline">Prototype notes</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink-900/40" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute bottom-0 left-0 top-0 w-full max-w-md overflow-y-auto bg-white p-7 shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-violet">Prototype notes</p>
                <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-bg-purple" aria-label="Close"><X size={18} /></button>
              </div>
              {note ? (
                <>
                  <h2 className="display-sm mt-4">{note.title}</h2>
                  <p className="mt-3 text-body">{note.goal}</p>
                  <p className="eyebrow mt-7 text-title">Design decisions</p>
                  <ul className="mt-3 space-y-2.5">{note.decisions.map((d) => <li key={d} className="flex gap-2.5 text-[15px] text-title"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />{d}</li>)}</ul>
                  <p className="eyebrow mt-7 text-title">Content sources</p>
                  <ul className="mt-3 space-y-1 text-sm text-body">{note.sources.map((s) => <li key={s}>{s}</li>)}</ul>
                </>
              ) : (
                <p className="mt-4 text-body">No notes for this page.</p>
              )}
              <div className="mt-8 rounded-2xl bg-bg-purple p-5 text-sm text-title">
                <p className="font-semibold text-ink">Legend</p>
                <p className="mt-2"><span className="placeholder">[LIKE THIS]</span> marks content that could not be verified on risein.com. It needs to be supplied by the Rise In team, not invented.</p>
                <p className="mt-2">Static/mock data only. No backend, auth or real submissions. Press <kbd className="rounded border border-line bg-white px-1">⌘K</kbd> to search.</p>
                <p className="mt-2">Typeface: Archivo Expanded stands in for the licensed brand title font, Grifter.</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
