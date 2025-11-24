import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import QuantumSphere from '../components/QuantumSphere'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const IntroPage = () => {
  return (
    <div className="page intro-page">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <QuantumSphere position={[0, 0, 0]} scale={1.5} speed={0.8} />
        <ParticleBackground />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="page-content">
        <motion.h1
          className="page-title intro-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Quantum Computing
        </motion.h1>
        <motion.p
          className="page-subtitle intro-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          The Next Frontier of Technology
        </motion.p>
        <motion.p
          className="intro-company"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Powered by LTIMindtree
        </motion.p>
      </div>
    </div>
  )
}

export default IntroPage


