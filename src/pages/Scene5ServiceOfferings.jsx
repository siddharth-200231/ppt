import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ServiceIcons from '../components/ServiceIcons'
import ParticleBackground from '../components/ParticleBackground'
import LTIMindtreeLogo from '../components/LTIMindtreeLogo'
import HybridCloudQuantum from '../components/HybridCloudQuantum'
import './Page.css'

const services = [
  { icon: '🔬', title: 'Quantum Analytics' },
  { icon: '🔐', title: 'Quantum Encryption' },
  { icon: '☁️', title: 'Hybrid Cloud Quantum' },
  { icon: '🤖', title: 'AI + Quantum' },
]

const Scene5ServiceOfferings = () => {
  const [assembled, setAssembled] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showHybrid, setShowHybrid] = useState(false)

  useEffect(() => {
    // Start assembling after delay
    const assembleTimer = setTimeout(() => {
      setAssembled(true)
    }, 2000)

    // Show hybrid cloud visualization
    const hybridTimer = setTimeout(() => {
      setShowHybrid(true)
    }, 3000)

    // Show text after assembly
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 5000)

    return () => {
      clearTimeout(assembleTimer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="page scene5-page">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, 5, 10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        <ServiceIcons services={services} assembled={assembled} />
        
        {assembled && (
          <LTIMindtreeLogo animated={false} />
        )}

        {showHybrid && (
          <group position={[0, -3, 0]}>
            <HybridCloudQuantum />
          </group>
        )}

        {showText && (
          <Text
            position={[0, -3.5, 0]}
            fontSize={0.4}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
            maxWidth={12}
            textAlign="center"
          >
            Launch Quantum Vertical → First-Mover Advantage
          </Text>
        )}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={!assembled}
          autoRotateSpeed={0.3}
        />
      </Canvas>

      <div className="page-content scene-content">
        <motion.h2
          className="scene-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Service Offerings
        </motion.h2>

        {showText && (
          <motion.p
            className="scene-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Launch Quantum Vertical → First-Mover Advantage
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default Scene5ServiceOfferings

