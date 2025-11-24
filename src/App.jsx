import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import BackgroundMusic from './components/BackgroundMusic'
import Scene1ClassicalComputing from './pages/Scene1ClassicalComputing'
import Scene2QubitsSuperposition from './pages/Scene2QubitsSuperposition'
import Scene3Entanglement from './pages/Scene3Entanglement'
import Scene4BusinessImpact from './pages/Scene4BusinessImpact'
import Scene5ServiceOfferings from './pages/Scene5ServiceOfferings'
import Scene6Conclusion from './pages/Scene6Conclusion'
import './App.css'

const PAGES = [
  { id: 0, component: Scene1ClassicalComputing, duration: 20 }, // 0:00-0:20
  { id: 1, component: Scene2QubitsSuperposition, duration: 30 }, // 0:20-0:50
  { id: 2, component: Scene3Entanglement, duration: 30 }, // 0:50-1:20
  { id: 3, component: Scene4BusinessImpact, duration: 30 }, // 1:20-1:50
  { id: 4, component: Scene5ServiceOfferings, duration: 30 }, // 1:50-2:20
  { id: 5, component: Scene6Conclusion, duration: 20 }, // 2:20-2:40
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
      const currentDuration = PAGES[currentPage]?.duration || 20
      const timeout = setTimeout(() => {
        setCurrentPage((prev) => {
          if (prev >= PAGES.length - 1) {
            setAutoplay(false)
            return prev
          }
          return prev + 1
        })
      }, currentDuration * 1000) // Use scene duration from PAGES config
      return () => clearTimeout(timeout)
    }
  }, [autoplay, isLoading, currentPage])

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


