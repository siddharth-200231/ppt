import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Text, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

const IndustryCaseStudy = ({ type = 'banking' }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  if (type === 'banking') {
    return (
      <group ref={groupRef}>
        {/* Credit card pattern visualization */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2
          const radius = 2 + Math.random() * 0.5
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                (Math.random() - 0.5) * 0.5
              ]}
            >
              <boxGeometry args={[0.1, 0.1, 0.02]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#ff0000' : '#00C6FF'}
                emissive={i % 2 === 0 ? '#ff0000' : '#00C6FF'}
                emissiveIntensity={0.8}
              />
            </mesh>
          )
        })}
        <Text
          position={[0, -3, 0]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Fraud Detection in Nanoseconds
        </Text>
      </group>
    )
  }

  if (type === 'healthcare') {
    return (
      <group ref={groupRef}>
        {/* Atom/molecule assembly animation */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2
          const time = Date.now() * 0.001
          return (
            <group key={i}>
              <Sphere
                position={[
                  Math.cos(angle + time) * 1.5,
                  Math.sin(angle + time) * 1.5,
                  0
                ]}
                args={[0.3, 16, 16]}
              >
                <meshStandardMaterial
                  color="#4AF0FF"
                  emissive="#4AF0FF"
                  emissiveIntensity={0.8}
                />
              </Sphere>
            </group>
          )
        })}
        <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={1}
          />
        </Sphere>
        <Text
          position={[0, -3, 0]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Rapid Drug Discovery
        </Text>
      </group>
    )
  }

  if (type === 'logistics') {
    return (
      <group ref={groupRef}>
        {/* Route optimization visualization */}
        {[
          [-2, -1, 0],
          [2, -1, 0],
          [0, 2, 0],
          [-2, 1, 0],
          [2, 1, 0],
        ].map((pos, i) => (
          <Sphere key={i} args={[0.3, 16, 16]} position={pos}>
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.8}
            />
          </Sphere>
        ))}
        {/* Optimized route lines */}
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={5}
              array={new Float32Array([
                -2, -1, 0,
                2, -1, 0,
                0, 2, 0,
                -2, 1, 0,
                2, 1, 0,
              ])}
              itemSize={3}
            />
            <bufferAttribute
              attach="index"
              count={8}
              array={new Uint16Array([0, 2, 1, 2, 3, 4, 0, 3])}
              itemSize={1}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#00C6FF" transparent opacity={0.5} wireframe />
        </mesh>
        <Text
          position={[0, -3, 0]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Real-Time Route Optimization
        </Text>
      </group>
    )
  }

  if (type === 'cybersecurity') {
    return (
      <group ref={groupRef}>
        {/* Quantum-secure vault */}
        <Box args={[3, 3, 3]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0A0F1E"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        
        {/* Shield effect */}
        <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>

        {/* Threat indicators (blocked) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <Cylinder
              key={i}
              args={[0.1, 0.1, 0.5, 8]}
              position={[
                Math.cos(angle) * 2.5,
                Math.sin(angle) * 2.5,
                0
              ]}
              rotation={[Math.PI / 2, 0, angle]}
            >
              <meshStandardMaterial
                color="#ff0000"
                emissive="#ff0000"
                emissiveIntensity={0.5}
                transparent
                opacity={0.5}
              />
            </Cylinder>
          )
        })}
        
        <Text
          position={[0, -3, 0]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Quantum-Secure Protection
        </Text>
      </group>
    )
  }

  return null
}

export default IndustryCaseStudy

