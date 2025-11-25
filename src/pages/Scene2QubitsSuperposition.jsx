import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import QubitSphere from '../components/QubitSphere'
import PossibilitiesWeb from '../components/PossibilitiesWeb'
import SuperpositionStates from '../components/SuperpositionStates'
import VolumetricLight from '../components/VolumetricLight'
import ParticleTrail from '../components/ParticleTrail'
import ParticleBackground from '../components/ParticleBackground'
import RobotCharacter from '../components/RobotCharacter'
import './Page.css'

const Scene2QubitsSuperposition = () => {
  const [expanded, setExpanded] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Start expansion after initial delay
    const timer = setTimeout(() => {
      setExpanded(true)
    }, 1000)

    // Show text after expansion
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="page scene2-page">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        <QubitSphere expand={expanded} />
        <PossibilitiesWeb expanded={expanded} />
        <SuperpositionStates position={[0, 0, 0]} />
        <VolumetricLight position={[0, 0, 0]} color="#00C6FF" intensity={2} />
        {expanded && (
          <ParticleTrail
            source={[-4, -2, 3]}
            target={[0, 0, 0]}
            color="#00C6FF"
            particleCount={50}
          />
        )}
        
        {/* Robot throwing all keys */}
        {expanded && (
          <RobotCharacter 
            position={[-4, -2, 3]} 
            frustrated={false}
          />
        )}

        {showText && (
          <Text
            position={[0, -3, 0]}
            fontSize={0.4}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
          >
            Many possibilities at once → Faster results
          </Text>
        )}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate
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
          Quantum Computing
        </motion.h2>
        
        <motion.p
          className="scene-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Quantum Computers = Qubits (0 & 1 simultaneously)
        </motion.p>

        {expanded && (
          <motion.div
            className="success-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>✅ All keys unlock simultaneously!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Scene2QubitsSuperposition

