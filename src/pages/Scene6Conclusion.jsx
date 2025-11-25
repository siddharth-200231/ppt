import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import WorldMap from '../components/WorldMap'
import ParticleBackground from '../components/ParticleBackground'
import LTIMindtreeLogo from '../components/LTIMindtreeLogo'
import RevenueChart from '../components/RevenueChart'
import BenefitBadges from '../components/BenefitBadges'
import './Page.css'

const Scene6Conclusion = () => {
  const [expanded, setExpanded] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [showRevenue, setShowRevenue] = useState(false)
  const [showBadges, setShowBadges] = useState(false)

  useEffect(() => {
    // Start expansion
    const expandTimer = setTimeout(() => {
      setExpanded(true)
    }, 1500)

    // Show revenue chart
    const revenueTimer = setTimeout(() => {
      setShowRevenue(true)
    }, 2000)

    // Show badges
    const badgesTimer = setTimeout(() => {
      setShowBadges(true)
    }, 4000)

    // Show final text
    const textTimer = setTimeout(() => {
      setShowFinalText(true)
    }, 6000)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="page scene6-page">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, 5, 10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        <WorldMap expanded={expanded} />
        
        {showRevenue && (
          <group position={[0, -2, 0]}>
            <RevenueChart animated={true} />
          </group>
        )}

        {showBadges && (
          <group position={[0, -4.5, 0]}>
            <BenefitBadges />
          </group>
        )}
        
        {showFinalText && (
          <>
            <LTIMindtreeLogo animated={true} />
            <Text
              position={[0, -4.5, 0]}
              fontSize={0.35}
              color="#4AF0FF"
              anchorX="center"
              anchorY="middle"
              maxWidth={12}
              textAlign="center"
            >
              Contact us • www.ltimindtree.com
            </Text>
          </>
        )}

        <Text
          position={[0, -3.5, 0]}
          fontSize={0.4}
          color="#00C6FF"
          anchorX="center"
          anchorY="middle"
          maxWidth={12}
          textAlign="center"
        >
          {expanded && "Global Market → Billion-Dollar Growth"}
        </Text>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
        />
      </Canvas>

      <div className="page-content scene-content conclusion-content-final">
        <motion.h1
          className="conclusion-title"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100, delay: 0.5 }}
        >
          Quantum is the Future
        </motion.h1>
        
        <motion.h2
          className="conclusion-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Mindtree isn't waiting for the future — we are building it.
        </motion.h2>

        {expanded && (
          <motion.p
            className="scene-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Global Market → Billion-Dollar Growth
          </motion.p>
        )}

        {showRevenue && (
          <motion.div
            className="tagline-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <p className="tagline">Better Accuracy, Better Speed, Better Trust</p>
            <p className="subtagline">Mindtree builds the digital future</p>
          </motion.div>
        )}

        {showFinalText && (
          <motion.div
            className="final-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 6 }}
          >
            <p>Contact us • www.ltimindtree.com</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Scene6Conclusion

