import { motion } from 'framer-motion'
import { IoChevronBack, IoChevronForward, IoPlay, IoPause } from 'react-icons/io5'
import './Navigation.css'

const Navigation = ({ currentPage, totalPages, onNext, onPrev, autoplay, onAutoplayToggle }) => {
  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <div className="navigation">
      {/* Previous Button */}
      <motion.button
        className={`nav-button nav-prev ${!canGoPrev ? 'disabled' : ''}`}
        onClick={onPrev}
        disabled={!canGoPrev}
        whileHover={canGoPrev ? { scale: 1.1 } : {}}
        whileTap={canGoPrev ? { scale: 0.9 } : {}}
      >
        <IoChevronBack />
      </motion.button>

      {/* Page Indicator */}
      <div className="page-indicator">
        {Array.from({ length: totalPages }).map((_, index) => (
          <motion.div
            key={index}
            className={`indicator-dot ${index === currentPage ? 'active' : ''}`}
            initial={false}
            animate={{
              scale: index === currentPage ? 1.2 : 1,
              opacity: index === currentPage ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        className={`nav-button nav-next ${!canGoNext ? 'disabled' : ''}`}
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.1 } : {}}
        whileTap={canGoNext ? { scale: 0.9 } : {}}
      >
        <IoChevronForward />
      </motion.button>

      {/* Autoplay Toggle */}
      <motion.button
        className="autoplay-button"
        onClick={onAutoplayToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={autoplay ? 'Pause autoplay' : 'Start autoplay'}
      >
        {autoplay ? <IoPause /> : <IoPlay />}
      </motion.button>
    </div>
  )
}

export default Navigation


