import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import EntangledQubits from '../components/EntangledQubits'
import EnergyWaveEntanglement from '../components/EnergyWaveEntanglement'
import MazeSolver from '../components/MazeSolver'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const Scene3Entanglement = () => {
  const [mazeSolved, setMazeSolved] = useState(false)

  useEffect(() => {
    // Solve maze after showing entanglement
    const timer = setTimeout(() => {
      setMazeSolved(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page scene3-page">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4AF0FF" />
        
        <ParticleBackground />
        
        <EntangledQubits />
        <MazeSolver solved={mazeSolved} />

        <Text
          position={[0, -3.5, 0]}
          fontSize={0.35}
          color="#00C6FF"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
          textAlign="center"
        >
          {mazeSolved ? "Problems once taking years now solved in minutes" : "Entanglement = Instant link between qubits"}
        </Text>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>

      <div className="page-content scene-content">
        <motion.h2
          className="scene-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Entanglement & Speed Advantage
        </motion.h2>
        
        <motion.p
          className="scene-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Entanglement = Instant link between qubits
        </motion.p>

        {mazeSolved && (
          <motion.div
            className="speed-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>⚡ Instant solution achieved!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Scene3Entanglement

