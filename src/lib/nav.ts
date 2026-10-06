import { Trophy, Coins, HandCoins, Briefcase, CalendarDays, Compass, BookOpen, GraduationCap, Layers, ScrollText, Users, Megaphone, Newspaper, Building2, Rocket, Hammer, FileBarChart, type LucideIcon } from 'lucide-react'

export interface NavItem { label: string; to: string; desc: string; icon: LucideIcon }
export interface NavGroup { label: string; intro: string; items: NavItem[]; feature?: { eyebrow: string; title: string; meta: string; to: string } }

/**
 * Proposed information architecture.
 * The brief suggested a separate "Build" menu; after the audit, "build" content on risein.com is
 * hackathons/challenges (→ Discover) and bootcamps/programs (→ Learn), so it is merged to avoid
 * duplicate entries. "For Ecosystems" is split out on the right as the B2B path.
 */
export const NAV: NavGroup[] = [
  {
    label: 'Discover',
    intro: 'Get paid to build in web3 & AI. One board, 100% free.',
    items: [
      { label: 'All opportunities', to: '/opportunities', desc: '300+ open opportunities, one board', icon: Compass },
      { label: 'Hackathons', to: '/opportunities?type=Hackathon', desc: 'Online & in-person, global', icon: Trophy },
      { label: 'Bounties', to: '/opportunities?type=Bounty', desc: 'Paid tasks from ecosystems', icon: Coins },
      { label: 'Grants', to: '/opportunities?type=Grant', desc: 'Funding for early builders', icon: HandCoins },
      { label: 'Jobs', to: '/opportunities?type=Job', desc: 'Roles across web3 teams', icon: Briefcase },
      { label: 'Events', to: '/opportunities?type=Event', desc: 'Hacker houses & IRL meetups', icon: CalendarDays },
    ],
    feature: { eyebrow: 'Live now · Monad', title: 'Metropolis Hackathon', meta: '$250K+ · closes Oct 13', to: '/opportunities/monad-metropolis-hackathon' },
  },
  {
    label: 'Learn',
    intro: 'Free courses and mentored bootcamps — from first block to mainnet.',
    items: [
      { label: 'All programs', to: '/programs', desc: 'Courses, bootcamps & builder camps', icon: Layers },
      { label: 'Courses', to: '/programs?format=Course', desc: 'Self-paced, free to start', icon: BookOpen },
      { label: 'Bootcamps', to: '/programs?format=Bootcamp', desc: 'Cohort-based, mentored', icon: GraduationCap },
      { label: 'Guides', to: '/blog?cat=Guides', desc: 'Beginner guides to Rust, Solidity & more', icon: ScrollText },
    ],
    feature: { eyebrow: 'Bootcamp · Free', title: 'Rust Bootcamp', meta: '3 weeks · online · certificate', to: '/programs/rust-bootcamp' },
  },
  {
    label: 'Community',
    intro: '400K+ builders across 180+ countries, learning and rising together.',
    items: [
      { label: 'Community & ambassadors', to: '/community', desc: 'Lead your region, grow with us', icon: Users },
      { label: 'Ambassador program', to: '/community#ambassadors', desc: 'Builder & Catalyst tracks', icon: Megaphone },
      { label: 'Builder stories', to: '/blog?cat=Builder%20stories', desc: 'From learner to shipper', icon: Rocket },
      { label: 'Insights', to: '/blog', desc: 'News, recaps & research', icon: Newspaper },
    ],
  },
]

export const ECOSYSTEM_NAV: NavGroup = {
  label: 'For Ecosystems',
  intro: 'Reach, activate, educate, fund and retain developers.',
  items: [
    { label: 'Partner with Rise In', to: '/ecosystems', desc: 'The developer growth partner', icon: Building2 },
    { label: 'Developer programs', to: '/ecosystems#offerings', desc: 'Hackathons, bootcamps, ambassadors', icon: Hammer },
    { label: 'Host a hackathon', to: '/ecosystems#host', desc: 'Free organiser platform', icon: Trophy },
    { label: 'Case studies', to: '/case-studies/stellar', desc: 'Stellar, Aptos, Stacks', icon: FileBarChart },
  ],
  feature: { eyebrow: 'Case study · Stellar', title: '14,000+ developers onboarded', meta: '5 countries · 2 years', to: '/case-studies/stellar' },
}
