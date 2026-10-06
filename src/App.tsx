import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Opportunities from './pages/Opportunities'
import OpportunityDetail from './pages/OpportunityDetail'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Ecosystems from './pages/Ecosystems'
import CaseStudy from './pages/CaseStudy'
import Community from './pages/Community'
import Blog from './pages/Blog'
import ArticlePage from './pages/Article'
import NotFound from './pages/NotFound'

/**
 * HashRouter keeps the prototype zero-config on any static host (GitHub Pages, S3, Netlify drop).
 * Production would use clean URLs: /opportunities, /programs/rust-bootcamp, etc.
 */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/:slug" element={<OpportunityDetail />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programs/:slug" element={<ProgramDetail />} />
            <Route path="ecosystems" element={<Ecosystems />} />
            <Route path="case-studies/:slug" element={<CaseStudy />} />
            <Route path="community" element={<Community />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </MotionConfig>
  )
}
