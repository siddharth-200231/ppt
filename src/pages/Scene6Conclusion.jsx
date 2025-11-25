import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import WorldMap from '../components/WorldMap'
import ParticleBackground from '../components/ParticleBackground'
import LTIMindtreeLogo from '../components/LTIMindtreeLogo'
import RevenueChart from '../components/RevenueChart'
import BenefitBadges from '../components/BenefitBadges'
import './Page.css'

const Scene6Conclusion = () => {
  const [expanded, setExpanded] = useState(false)
  const [showPhase, setShowPhase] = useState(0) // 0: title, 1: revenue, 2: badges, 3: final

  useEffect(() => {
    // Phase 0: Show title and map expansion
    const expandTimer = setTimeout(() => {
      setExpanded(true)
      setShowPhase(1) // Move to revenue phase
    }, 2000)

    // Phase 1: Show revenue chart (after 4 seconds)
    const revenueTimer = setTimeout(() => {
      setShowPhase(2) // Move to badges phase
    }, 6000)

    // Phase 2: Show badges (after 8 seconds)
    const badgesTimer = setTimeout(() => {
      setShowPhase(3) // Move to final phase
    }, 10000)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(revenueTimer)
      clearTimeout(badgesTimer)
    }
  }, [])

  return (
    <div className="page scene6-page">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, 5, 10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        {/* Always show map */}
        <WorldMap expanded={expanded} />
        
        {/* Only show revenue chart in phase 1 */}
        {showPhase === 1 && (
          <group position={[0, -2, -2]}>
            <RevenueChart animated={true} />
          </group>
        )}

        {/* Only show badges in phase 2 */}
        {showPhase === 2 && (
          <group position={[0, -4.5, -2]}>
            <BenefitBadges />
          </group>
        )}
        
        {/* Only show logo and contact in final phase */}
        {showPhase === 3 && (
          <LTIMindtreeLogo animated={true} />
        )}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
        />
      </Canvas>

      <div className="page-content scene-content conclusion-content-final">
        <AnimatePresence mode="wait">
          {/* Phase 0: Main title and subtitle */}
          {showPhase === 0 && (
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="conclusion-main"
            >
              <motion.h1
                className="conclusion-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Quantum is the Future
              </motion.h1>
              
              <motion.h2
                className="conclusion-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Mindtree isn't waiting for the future — we are building it.
              </motion.h2>
            </motion.div>
          )}

          {/* Phase 1: Revenue growth focus */}
          {showPhase === 1 && (
            <motion.div
              key="revenue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="conclusion-focus"
            >
              <motion.h2
                className="scene-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Global Market → Billion-Dollar Growth
              </motion.h2>
              <motion.p
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Better Accuracy, Better Speed, Better Trust
              </motion.p>
            </motion.div>
          )}

          {/* Phase 2: Benefits focus */}
          {showPhase === 2 && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="conclusion-focus"
            >
              <motion.h2
                className="scene-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Quantum-Powered Solutions
              </motion.h2>
              <motion.p
                className="subtagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Mindtree builds the digital future
              </motion.p>
            </motion.div>
          )}

          {/* Phase 3: Final CTA */}
          {showPhase === 3 && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="conclusion-final"
            >
              <motion.h1
                className="conclusion-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Quantum is the Future
              </motion.h1>
              
              <motion.div
                className="final-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p>Contact us • www.ltimindtree.com</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Scene6Conclusion
