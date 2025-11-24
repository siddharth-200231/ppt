import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import BackgroundMusic from './components/BackgroundMusic'
import IntroPage from './pages/IntroPage'
import WhatIsQuantumPage from './pages/WhatIsQuantumPage'
import UseCasesPage from './pages/UseCasesPage'
import ServicesPage from './pages/ServicesPage'
import RevenuePage from './pages/RevenuePage'
import ConclusionPage from './pages/ConclusionPage'
import './App.css'

const PAGES = [
  { id: 0, component: IntroPage },
  { id: 1, component: WhatIsQuantumPage },
  { id: 2, component: UseCasesPage },
  { id: 3, component: ServicesPage },
  { id: 4, component: RevenuePage },
  { id: 5, component: ConclusionPage },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [autoplay, setAutoplay] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (autoplay && !isLoading) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= PAGES.length - 1) {
            setAutoplay(false)
            return prev
          }
          return prev + 1
        })
      }, 8000) // Change slide every 8 seconds
      return () => clearInterval(interval)
    }
  }, [autoplay, isLoading])

  const nextPage = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage(currentPage + 1)
      setAutoplay(false)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setAutoplay(false)
    }
  }

  const CurrentPageComponent = PAGES[currentPage].component

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="page-container"
        >
          <CurrentPageComponent />
        </motion.div>
      </AnimatePresence>
      
      <Navigation
        currentPage={currentPage}
        totalPages={PAGES.length}
        onNext={nextPage}
        onPrev={prevPage}
        autoplay={autoplay}
        onAutoplayToggle={() => setAutoplay(!autoplay)}
      />

      <BackgroundMusic enabled={musicEnabled} onToggle={() => setMusicEnabled(!musicEnabled)} />
    </div>
  )
}

export default App


