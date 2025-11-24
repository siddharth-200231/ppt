import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import QuantumSphere from '../components/QuantumSphere'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const WhatIsQuantumPage = () => {
  return (
    <div className="page what-is-page">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <QuantumSphere position={[0, 0, 0]} scale={1.2} speed={1} />
        <ParticleBackground />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          What is Quantum Computing?
        </motion.h1>
        
        <motion.div
          className="analogy-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="analogy-item">
            <motion.div
              className="analogy-icon classical"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <span>📚</span>
            </motion.div>
            <h3>Classical Computing</h3>
            <p>One book at a time</p>
          </div>
          
          <motion.div
            className="arrow"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            →
          </motion.div>
          
          <div className="analogy-item">
            <motion.div
              className="analogy-icon quantum"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
            >
              <span>📚📚📚</span>
            </motion.div>
            <h3>Quantum Computing</h3>
            <p>All books simultaneously</p>
          </div>
        </motion.div>
        
        <motion.p
          className="explanation-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Quantum computers use qubits that can exist in multiple states at once
          (superposition), enabling exponentially faster problem-solving.
        </motion.p>
      </div>
    </div>
  )
}

export default WhatIsQuantumPage


