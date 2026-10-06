/**
 * Content model for the prototype. Everything is static/mock data.
 * Any string wrapped in [SQUARE BRACKETS] is a deliberate placeholder for content
 * that could not be verified from the current risein.com site — it is rendered
 * with a dashed "to be provided" treatment by <Fill />.
 */

export type EcosystemId =
  | 'risein' | 'monad' | 'stellar' | 'midnight' | 'stacks' | 'solana' | 'sui' | 'aptos'
  | 'multiversx' | 'opencampus' | 'nordek' | 'bnb' | 'icp' | 'polkadot' | 'tbd'

export interface Ecosystem {
  id: EcosystemId
  name: string
  /** Two-letter monogram used instead of third-party logos in the prototype. */
  mono: string
  /** Brand-palette accent used for cover art (not the ecosystem's own brand colour). */
  accent: 'violet' | 'magenta' | 'lime' | 'teal' | 'periwinkle' | 'cobalt'
  blurb?: string
}

export type OpportunityType = 'Hackathon' | 'Bounty' | 'Grant' | 'Job' | 'Course' | 'Event' | 'Program'
export type Mode = 'Online' | 'In-person'
export type Status = 'Open' | 'Upcoming' | 'Ended' | 'Dates TBC' | 'Self-paced'

export interface TimelineStep { date: string; label: string; note?: string }
export interface Faq { q: string; a: string }

export interface Opportunity {
  slug: string
  title: string
  ecosystem: EcosystemId
  type: OpportunityType
  mode: Mode
  location?: string
  /** Display string, e.g. "$250K+". null → placeholder. */
  reward: string | null
  /** Numeric USD value for sorting only. */
  rewardValue?: number
  /** ISO date of the application / submission deadline. null → placeholder. */
  deadline: string | null
  /** Overrides computed status (e.g. self-paced courses). */
  status?: Status
  dateLabel?: string
  summary: string
  featured?: boolean
  source: string
  detail?: {
    overview: string[]
    build?: string[]
    requirements?: string[]
    tracks?: { name: string; desc?: string; prize?: string }[]
    rewards?: { label: string; value: string }[]
    timeline?: TimelineStep[]
    faq?: Faq[]
    stats?: { value: string; label: string }[]
  }
}

export type ProgramFormat = 'Bootcamp' | 'Course' | 'Builder camp' | 'Internship'
export type Level = 'Intro' | 'Technical'

export interface Program {
  slug: string
  title: string
  ecosystem: EcosystemId
  format: ProgramFormat
  level: Level
  duration: string
  dates: string
  status: Status
  summary: string
  prize?: string
  topics: string[]
  featured?: boolean
  source: string
  detail?: {
    about: string[]
    audience: { title: string; desc: string }[]
    curriculum: { title: string; items: string[] }[]
    timeline: TimelineStep[]
    outcomes: string[]
    mentors?: string
    faq: Faq[]
  }
}

export interface ArticleBlock { type: 'p' | 'h2' | 'quote' | 'list' | 'stats'; text?: string; items?: string[]; stats?: { value: string; label: string }[] }

export interface Article {
  slug: string
  title: string
  category: 'Event recap' | 'Guides' | 'Ecosystems' | 'Builder stories' | 'Insights' | 'Case study'
  excerpt: string
  date: string | null
  readTime?: string
  featured?: boolean
  source: string
  body?: ArticleBlock[]
}

export interface CaseStudy {
  slug: string
  ecosystem: EcosystemId
  title: string
  subtitle: string
  region: string
  period: string
  programs: string[]
  challenge: string[]
  approach: { title: string; desc: string }[]
  metrics: { value: string; label: string; note?: string }[]
  milestones: TimelineStep[]
  quote?: { text: string; name: string; role: string }
  sources: string[]
}
