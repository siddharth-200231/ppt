import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'
import { 
  FaFlask, 
  FaShieldAlt, 
  FaChartLine, 
  FaBrain,
  FaAtom,
  FaKey
} from 'react-icons/fa'
import './Page.css'

const useCases = [
  { icon: FaFlask, title: 'Drug Discovery', desc: 'Faster molecular simulation' },
  { icon: FaShieldAlt, title: 'Cybersecurity', desc: 'Unbreakable encryption' },
  { icon: FaChartLine, title: 'Financial Modeling', desc: 'Risk analysis & optimization' },
  { icon: FaBrain, title: 'AI & Machine Learning', desc: 'Enhanced pattern recognition' },
  { icon: FaAtom, title: 'Material Science', desc: 'New material development' },
  { icon: FaKey, title: 'Cryptography', desc: 'Quantum-safe security' },
]

const UseCasesPage = () => {
  return (
    <div className="page use-cases-page">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleBackground />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Use Cases & Benefits
        </motion.h1>
        
        <div className="use-cases-grid">
          {useCases.map((item, index) => (
            <motion.div
              key={index}
              className="use-case-card"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -10 }}
            >
              <motion.div
                className="use-case-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon />
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="benefits-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Why is it Important?</h2>
          <ul>
            <li>Exponential speedup for complex problems</li>
            <li>Breakthrough discoveries in science & medicine</li>
            <li>Revolutionary advances in AI and optimization</li>
            <li>Future-proofing against quantum threats</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default UseCasesPage


