import type { Ecosystem, EcosystemId } from './types'

/**
 * Verified Rise In metrics, as published on risein.com at the time of the audit.
 * `source` is kept next to each number so the product team can re-verify before launch.
 */
export const METRICS = {
  builders: { value: '400K+', label: 'builders', source: 'risein.com' },
  countries: { value: '180+', label: 'countries', source: 'risein.com' },
  ecosystems: { value: '500+', label: 'ecosystems & companies backing Rise In', source: 'risein.com' },
  openRewards: { value: '$1.1M', label: 'in open rewards', source: 'risein.com/earn' },
  opportunities: { value: '300+', label: 'opportunities on one board', source: 'risein.com/earn' },
  programsRun: { value: '160+', label: 'programs run with partners', source: 'risein.com/partner-with-us' },
  chains: { value: '20+', label: 'chains & web3 projects', source: 'risein.com/partner-with-us' },
  irlCountries: { value: '10+', label: 'countries with IRL events', source: 'risein.com' },
  courses: { value: '24', label: 'courses', source: 'risein.com/courses' },
  courseHours: { value: '88', label: 'hours of content', source: 'risein.com/courses' },
  learners: { value: '198,139', label: 'learners', source: 'risein.com/courses' },
  projects: { value: '30,000+', label: 'projects supported', source: 'risein.com/reach-web3-developers-india' },
  shippers: { value: '22,000+', label: 'developers shipped at least one web3 project', source: 'risein.com/reach-web3-developers-india' },
  stellarDevs: { value: '14,000+', label: 'Stellar developers onboarded across 5 countries in 2 years', source: 'risein.com/partner-with-us' },
  indiaDevs: { value: '~70,000', label: 'registered developers in India', source: 'risein.com/reach-web3-developers-india' },
  aptosShare: { value: '16%', label: 'of all new Aptos developers globally in 2024 (Electric Capital)', source: 'risein.com/reach-web3-developers-india' },
} as const

export const POSITIONING = {
  title: "The world's largest web3 builder community",
  tagline: 'Hundreds of thousands of developers learning for free, shipping real projects, and getting paid.',
  mission:
    'Rise In charts clear pathways to learn web3, build prototypes, and ship products that solve real problems.',
}

export const ECOSYSTEMS: Record<EcosystemId, Ecosystem> = {
  risein: { id: 'risein', name: 'Rise In', mono: 'RI', accent: 'violet' },
  monad: { id: 'monad', name: 'Monad', mono: 'MO', accent: 'violet', blurb: 'High-performance EVM' },
  stellar: { id: 'stellar', name: 'Stellar', mono: 'ST', accent: 'cobalt', blurb: 'Payments & real-world finance' },
  midnight: { id: 'midnight', name: 'Midnight', mono: 'MN', accent: 'periwinkle', blurb: 'Data-protection chain using zero-knowledge proofs' },
  stacks: { id: 'stacks', name: 'Stacks', mono: 'SX', accent: 'magenta', blurb: 'Bitcoin layer' },
  solana: { id: 'solana', name: 'Solana', mono: 'SO', accent: 'teal' },
  sui: { id: 'sui', name: 'Sui', mono: 'SU', accent: 'cobalt' },
  aptos: { id: 'aptos', name: 'Aptos', mono: 'AP', accent: 'teal' },
  multiversx: { id: 'multiversx', name: 'MultiversX', mono: 'MX', accent: 'lime' },
  opencampus: { id: 'opencampus', name: 'Open Campus', mono: 'OC', accent: 'lime' },
  nordek: { id: 'nordek', name: 'Nordek', mono: 'NK', accent: 'magenta' },
  bnb: { id: 'bnb', name: 'BNB Chain', mono: 'BN', accent: 'lime' },
  icp: { id: 'icp', name: 'Internet Computer', mono: 'IC', accent: 'magenta' },
  polkadot: { id: 'polkadot', name: 'Polkadot', mono: 'DOT', accent: 'magenta' },
  tbd: { id: 'tbd', name: '[ECOSYSTEM]', mono: '··', accent: 'periwinkle' },
}

/** Ecosystems referenced across risein.com programs, blog posts and partner pages. */
export const ECOSYSTEM_WALL = [
  'Stellar', 'Monad', 'Aptos', 'Solana', 'Midnight', 'Stacks', 'Sui', 'MultiversX',
  'Internet Computer', 'Polkadot', 'BNB Chain', 'Celo', 'Chiliz', 'Algorand', 'Open Campus', 'Neo X',
]

export const TESTIMONIALS = [
  {
    text: 'Rise In is truly bringing together the next generation of developers globally, truly dedicated to furthering mission-oriented work, helping developers see the real impact, and building real-world solutions on Stellar.',
    name: 'Anuhya Challagundla',
    role: 'Ecosystem Development Manager, Stellar Development Foundation',
  },
]
