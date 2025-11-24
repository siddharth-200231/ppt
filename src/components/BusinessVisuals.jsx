import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const BusinessVisuals = ({ type = 'banking' }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  if (type === 'banking') {
    // Digital vault visualization
    return (
      <group ref={groupRef} position={[-3, 0, 0]}>
        {/* Vault */}
        <Box args={[2, 2, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00C6FF"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        {/* Lock */}
        <Box args={[0.3, 0.3, 0.2]} position={[0, 0, 0.6]}>
          <meshStandardMaterial
            color="#4AF0FF"
            emissive="#4AF0FF"
            emissiveIntensity={0.5}
          />
        </Box>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Fraud Detection
        </Text>
      </group>
    )
  }

  if (type === 'pharma') {
    // Molecule model
    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Molecule structure */}
        <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#00C6FF" emissive="#00C6FF" />
        </Sphere>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * 0.8
          const z = Math.sin(rad) * 0.8
          return (
            <group key={i}>
              <Sphere args={[0.2, 16, 16]} position={[x, 0, z]}>
                <meshStandardMaterial color="#4AF0FF" emissive="#4AF0FF" />
              </Sphere>
              <mesh>
                <cylinderGeometry args={[0.05, 0.05, 0.8]} />
                <meshBasicMaterial color="#00C6FF" transparent opacity={0.5} />
              </mesh>
            </group>
          )
        })}
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Drug Discovery
        </Text>
      </group>
    )
  }

  if (type === 'logistics') {
    // Route optimization map
    return (
      <group ref={groupRef} position={[3, 0, 0]}>
        {/* Map grid */}
        <Box args={[2, 2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0A0F1E" wireframe />
        </Box>
        
        {/* Optimized route lines */}
        {[
          [-0.8, -0.8, 0],
          [0.8, -0.8, 0],
          [0.8, 0.8, 0],
          [-0.8, 0.8, 0],
        ].map((pos, i) => (
          <Sphere key={i} args={[0.1, 8, 8]} position={pos}>
            <meshStandardMaterial color="#00C6FF" emissive="#00C6FF" />
          </Sphere>
        ))}
        
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Route Optimization
        </Text>
      </group>
    )
  }

  return null
}

export default BusinessVisuals

