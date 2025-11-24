import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import * as THREE from 'three'

const LTIMindtreeLogo = ({ animated = true }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (animated && groupRef.current) {
      // Gentle float animation
      const float = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      groupRef.current.position.y = float
    }
  })

  return (
    <group ref={groupRef}>
      {/* Logo background plate */}
      <Box args={[6, 2, 0.2]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#0A0F1E"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* LTI Mindtree text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.8}
        color="#00C6FF"
        anchorX="center"
        anchorY="middle"
      >
        LTI MINDTREE
      </Text>

      {/* Glow effect */}
      <Box args={[6.2, 2.2, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial
          color="#00C6FF"
          emissive="#00C6FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </Box>
    </group>
  )
}

export default LTIMindtreeLogo

