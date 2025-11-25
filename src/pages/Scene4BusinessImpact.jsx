import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import LTIMindtreeLogo from '../components/LTIMindtreeLogo'
import BusinessVisuals from '../components/BusinessVisuals'
import IndustryCaseStudy from '../components/IndustryCaseStudy'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const Scene4BusinessImpact = () => {
  const [showVisuals, setShowVisuals] = useState(false)
  const [currentVisual, setCurrentVisual] = useState('banking')

  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => {
      setShowVisuals(true)
    }, 1500)

    // Cycle through visuals
    const visualCycle = setInterval(() => {
      setCurrentVisual(prev => {
        if (prev === 'banking') return 'pharma'
        if (prev === 'pharma') return 'logistics'
        if (prev === 'logistics') return 'cybersecurity'
        return 'banking'
      })
    }, 3000)

    return () => {
      clearTimeout(logoTimer)
      clearInterval(visualCycle)
    }
  }, [])

  return (
    <div className="page scene4-page">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, 5, 10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        <LTIMindtreeLogo animated={true} />
        
        {showVisuals && (
          <>
            <BusinessVisuals type={currentVisual} />
            <IndustryCaseStudy type={currentVisual} />
          </>
        )}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
        />
      </Canvas>

      <div className="page-content scene-content">
        <motion.h2
          className="scene-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          How LTI Mindtree Benefits
        </motion.h2>
        
        {currentVisual === 'banking' && (
          <motion.div
            key="banking"
            className="benefit-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Banking: Digital vault unlocking faster</p>
            <p className="subtitle">= Fraud detection</p>
          </motion.div>
        )}

        {currentVisual === 'pharma' && (
          <motion.div
            key="pharma"
            className="benefit-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Pharma: Molecule model spinning</p>
            <p className="subtitle">= Drug discovery</p>
          </motion.div>
        )}

        {currentVisual === 'logistics' && (
          <motion.div
            key="logistics"
            className="benefit-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Logistics: Routes refining in real-time</p>
            <p className="subtitle">= Cost optimization</p>
          </motion.div>
        )}

        {currentVisual === 'cybersecurity' && (
          <motion.div
            key="cybersecurity"
            className="benefit-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Cybersecurity: Quantum-secure vault shields</p>
            <p className="subtitle">= Protection from threats</p>
          </motion.div>
        )}

        <motion.div
          className="value-props"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>High-value services • New clients • Premium pricing</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Scene4BusinessImpact

