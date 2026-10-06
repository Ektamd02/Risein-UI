import type { CaseStudy } from './types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'stellar',
    ecosystem: 'stellar',
    title: 'Becoming the biggest contributor to the Stellar developer ecosystem',
    subtitle: '14,000+ developers onboarded across 5 countries in 2 years.',
    region: 'Turkey → India, Vietnam, Indonesia, Philippines',
    period: '2024 – present',
    programs: ['Courses & onboarding', 'Bootcamps & builder camps', 'Hackathons', 'Ambassador program', 'Grant pathways'],
    challenge: [
      'Grow a global base of developers who build real-world products on Stellar — not just one-off hackathon entries.',
      'Do it region by region, with local communities that keep shipping after a program ends.',
    ],
    approach: [
      { title: 'Start local, then expand', desc: 'Began in Turkey, then expanded the partnership into India, Vietnam, Indonesia and the Philippines.' },
      { title: 'Educate at scale', desc: 'Self-paced Build on Stellar course plus cohort-based bootcamps and Soroban builder camps.' },
      { title: 'Activate with hackathons', desc: 'From online builder camps to the 36-hour, in-person Stellar Pro Hackathon in Istanbul.' },
      { title: 'Retain with ambassadors', desc: 'A regional ambassador program with Builder and Catalyst tracks, and a performance-based grants pathway.' },
    ],
    metrics: [
      { value: '14,000+', label: 'developers onboarded', note: 'across 5 countries in 2 years' },
      { value: '3,500+', label: 'Stellar developers engaged in India' },
      { value: '692', label: 'Stellar projects from India' },
      { value: '150', label: 'builders at the Stellar Pro Hackathon, Istanbul' },
    ],
    milestones: [
      { date: '2024', label: 'Partnership begins in Turkey' },
      { date: 'Apr 2025', label: 'Stellar Builder Camp', note: 'Soroban · $15,000 prize pool' },
      { date: '[DATE]', label: 'Expansion to India, Vietnam, Indonesia, Philippines' },
      { date: 'Sep 2026', label: 'Stellar Pro Hackathon, Istanbul', note: '150 builders · $15K' },
    ],
    quote: {
      text: 'Rise In is truly bringing together the next generation of developers globally, truly dedicated to furthering mission-oriented work, helping developers see the real impact, and building real-world solutions on Stellar.',
      name: 'Anuhya Challagundla',
      role: 'Ecosystem Development Manager, Stellar Development Foundation',
    },
    sources: ['risein.com/partner-with-us', 'risein.com/stellar-ambassadors', 'risein.com/reach-web3-developers-india', 'risein.com/programs/stellar-pro-hackathon'],
  },
  {
    slug: 'aptos-india',
    ecosystem: 'aptos',
    title: 'Training 16% of all new Aptos developers worldwide — from India',
    subtitle: '1,500+ developers trained, 407 Aptos projects.',
    region: 'India',
    period: '2024',
    programs: ['Courses', 'Bootcamps', 'Hackathons', 'University programs'],
    challenge: ['Reach and train Aptos developers in India, one of the fastest-growing developer markets.'],
    approach: [
      { title: 'National pipeline', desc: "Rise In's India community — nearly 70,000 registered developers — as the top of the funnel." },
      { title: 'Free education', desc: 'Free courses and bootcamps as the on-ramp.' },
      { title: 'Build & ship', desc: 'Hackathons and university programs to turn learners into shippers.' },
    ],
    metrics: [
      { value: '1,500+', label: 'Aptos developers trained' },
      { value: '16%', label: 'of all new Aptos developers globally in 2024', note: 'per Electric Capital' },
      { value: '407', label: 'Aptos projects' },
    ],
    milestones: [{ date: '2024', label: 'Program delivered across India' }],
    sources: ['risein.com/reach-web3-developers-india'],
  },
  {
    slug: 'stacks-hacker-house-goa',
    ecosystem: 'stacks',
    title: 'The first Stacks Hacker House in India',
    subtitle: '43 developers, 29 projects, 3 days in Goa.',
    region: 'Goa, India',
    period: 'Sep 2025',
    programs: ['Hacker house'],
    challenge: ['Get developers to try Stacks — and stay.'],
    approach: [
      { title: 'Three days, in person', desc: 'An immersive hacker house where laptops stayed open late into the night.' },
      { title: 'Ship, then judge', desc: '29 projects submitted, three winners named.' },
    ],
    metrics: [
      { value: '43', label: 'developers' },
      { value: '29', label: 'projects submitted' },
      { value: '3', label: 'days' },
    ],
    milestones: [{ date: 'Sep 2025', label: 'Hacker House — Goa' }],
    sources: ['risein.com/blog/first-stacks-hacker-house-in-india-here-are-the-inners'],
  },
]

export const caseBySlug = (slug?: string) => CASE_STUDIES.find((c) => c.slug === slug)
