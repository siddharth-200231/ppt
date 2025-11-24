import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const revenueData = [
  { year: '2024', value: 20, label: '$20M' },
  { year: '2025', value: 45, label: '$45M' },
  { year: '2026', value: 75, label: '$75M' },
  { year: '2027', value: 120, label: '$120M' },
  { year: '2028', value: 180, label: '$180M' },
]

const RevenuePage = () => {
  const maxValue = Math.max(...revenueData.map(d => d.value))

  return (
    <div className="page revenue-page">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleBackground />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
      
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Revenue Growth Projection
        </motion.h1>
        
        <div className="chart-container">
          {revenueData.map((data, index) => (
            <motion.div
              key={index}
              className="chart-bar-wrapper"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="chart-bar-container">
                <motion.div
                  className="chart-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: 'easeOut' }}
                >
                  <span className="chart-value">{data.label}</span>
                </motion.div>
              </div>
              <div className="chart-label">{data.year}</div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="revenue-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="stat-item">
            <h3>800%</h3>
            <p>Growth Over 5 Years</p>
          </div>
          <div className="stat-item">
            <h3>$180M</h3>
            <p>Projected Revenue by 2028</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Potential Enterprise Clients</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RevenuePage


