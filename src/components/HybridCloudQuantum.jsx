import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

const HybridCloudQuantum = () => {
  const classicalRef = useRef()
  const quantumRef = useRef()
  const mergeStreamRef = useRef()
  const handshakeRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Classical cloud server animation
    if (classicalRef.current) {
      classicalRef.current.rotation.y = time * 0.2
      const pulse = Math.sin(time * 2) * 0.1 + 1
      classicalRef.current.scale.setScalar(pulse)
    }

    // Quantum chip animation
    if (quantumRef.current) {
      quantumRef.current.rotation.y = time * 0.3
      const pulse = Math.sin(time * 3) * 0.1 + 1
      quantumRef.current.scale.setScalar(pulse)
    }

    // Handshake animation
    if (handshakeRef.current) {
      const handshake = Math.sin(time * 2) * 0.2
      handshakeRef.current.position.y = handshake
    }

    // Binary + qubit stream merging
    if (mergeStreamRef.current) {
      mergeStreamRef.current.rotation.z = time * 0.5
    }
  })

  return (
    <group>
      {/* Classical cloud server (left) */}
      <group ref={classicalRef} position={[-4, 0, 0]}>
        <Box args={[2, 2, 1]}>
          <meshStandardMaterial
            color="#4AF0FF"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Classical Cloud
        </Text>
        
        {/* Binary stream */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            args={[0.2, 0.8, 0.2]}
            position={[0, -2.5 - i * 0.3, 0]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00C6FF' : '#4AF0FF'}
              emissive={i % 2 === 0 ? '#00C6FF' : '#4AF0FF'}
            />
          </Box>
        ))}
      </group>

      {/* Quantum chip (right) */}
      <group ref={quantumRef} position={[4, 0, 0]}>
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Quantum Chip
        </Text>
        
        {/* Qubit stream */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.2, 16, 16]}
            position={[0, -2.5 - i * 0.3, 0]}
          >
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.8}
            />
          </Sphere>
        ))}
      </group>

      {/* Handshake/connection point */}
      <group ref={handshakeRef} position={[0, 0, 0]}>
        <Sphere args={[0.5, 16, 16]}>
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={1}
          />
        </Sphere>
        
        {/* Connection lines */}
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-4, 0, 0, 4, 0, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00C6FF" />
        </mesh>
      </group>

      {/* Merged stream visualization */}
      <group ref={mergeStreamRef} position={[0, -3, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.4}
          color="#00C6FF"
          anchorX="center"
          anchorY="middle"
        >
          Hybrid Cloud + Quantum
        </Text>
        
        {/* Combined binary/qubit particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh
            key={i}
            position={[(i - 5) * 0.3, -0.5, 0]}
          >
            {i % 2 === 0 ? (
              <boxGeometry args={[0.15, 0.3, 0.15]} />
            ) : (
              <sphereGeometry args={[0.15, 8, 8]} />
            )}
            <meshStandardMaterial
              color={i % 2 === 0 ? '#4AF0FF' : '#00C6FF'}
              emissive={i % 2 === 0 ? '#4AF0FF' : '#00C6FF'}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default HybridCloudQuantum

