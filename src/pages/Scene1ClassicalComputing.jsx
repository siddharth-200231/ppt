import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ConveyorBelt from '../components/ConveyorBelt'
import RobotCharacter from '../components/RobotCharacter'
import ParticleBackground from '../components/ParticleBackground'
import './Page.css'

const Scene1ClassicalComputing = () => {
  const [frustrated, setFrustrated] = useState(false)
  const [keysTried, setKeysTried] = useState(0)

  const handleConveyorStop = () => {
    setFrustrated(true)
  }

  const handleTryKey = () => {
    setKeysTried(prev => prev + 1)
  }

  return (
    <div className="page scene1-page">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, 10]} intensity={0.5} color="#00C6FF" />
        
        <ParticleBackground />
        
        <ConveyorBelt speed={0.5} onStop={handleConveyorStop} />
        <RobotCharacter 
          position={[-3, 1, 2]} 
          frustrated={frustrated}
          onTryKey={handleTryKey}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      <div className="page-content scene-content">
        <motion.h2
          className="scene-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Classical Computing
        </motion.h2>
        
        <motion.p
          className="scene-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Classical Computers = Bits (0 or 1)
          <br />
          Process one state at a time
        </motion.p>

        {frustrated && (
          <motion.div
            className="frustration-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>❌ Tried {keysTried} keys... Still searching...</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Scene1ClassicalComputing

