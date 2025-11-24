import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Html } from '@react-three/drei'
import * as THREE from 'three'

const FloatingCard = ({ position, title, description, icon, delay = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3
      
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Box args={[2.5, 3, 0.1]}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Box>
      
      {/* Border glow */}
      <Box args={[2.5, 3, 0.11]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </Box>
      
      {/* Content */}
      <Html
        position={[0, 0.5, 0.1]}
        transform
        center
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          fontSize: '48px',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          {icon}
        </div>
      </Html>
      
      <Text
        position={[0, -0.3, 0.1]}
        fontSize={0.15}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        textAlign="center"
        font="/fonts/inter-bold.woff"
      >
        {title}
      </Text>
      
      <Text
        position={[0, -1, 0.1]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        maxWidth={2.2}
        textAlign="center"
      >
        {description}
      </Text>
    </group>
  )
}

export default FloatingCard

