import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, Suspense } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import FloatingCard from '../components/FloatingCard'
import './Page.css'

const services = [
  {
    title: 'Quantum Strategy & Consulting',
    description: 'Strategic roadmaps for quantum adoption and transformation',
    icon: '🎯',
    position: [-3, 0, -2],
  },
  {
    title: 'Quantum Algorithm Development',
    description: 'Custom quantum algorithms for specific business problems',
    icon: '⚡',
    position: [0, 1, -2],
  },
  {
    title: 'Quantum Cloud Integration',
    description: 'Seamless integration with quantum cloud platforms',
    icon: '☁️',
    position: [3, 0, -2],
  },
  {
    title: 'Quantum Security Solutions',
    description: 'Post-quantum cryptography and quantum-safe security',
    icon: '🔒',
    position: [-3, -1.5, -2],
  },
  {
    title: 'Hybrid Quantum-Classical Systems',
    description: 'Optimized workflows combining quantum and classical computing',
    icon: '🔗',
    position: [3, -1.5, -2],
  },
]

const targetClients = [
  'Pharmaceutical Companies',
  'Financial Institutions',
  'Government & Defense',
  'Tech Giants',
  'Research Organizations',
]

const ServicesPage = () => {
  return (
    <div className="page services-page">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <ParticleBackground />
        <Suspense fallback={null}>
          {services.map((service, index) => (
            <FloatingCard
              key={index}
              position={service.position}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.2}
            />
          ))}
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          LTIMindtree Quantum Services
        </motion.h1>
        
        <motion.div
          className="target-clients"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2>Target Clients</h2>
          <div className="clients-list">
            {targetClients.map((client, index) => (
              <motion.div
                key={index}
                className="client-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServicesPage


