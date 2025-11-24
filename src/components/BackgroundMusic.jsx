import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoMusicalNotes, IoMusicalNotesOutline } from 'react-icons/io5'
import './BackgroundMusic.css'

const BackgroundMusic = ({ enabled, onToggle }) => {
  return (
    <motion.button
      className="music-toggle"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      title={enabled ? 'Disable background music' : 'Enable background music'}
    >
      {enabled ? <IoMusicalNotes /> : <IoMusicalNotesOutline />}
      {enabled && <div className="music-pulse"></div>}
    </motion.button>
  )
}

export default BackgroundMusic


