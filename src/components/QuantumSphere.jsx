import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const QuantumSphere = ({ position = [0, 0, 0], scale = 1, speed = 1 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 * speed
      
      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse)
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color="#00d4ff"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
      {/* Inner glow */}
      <pointLight intensity={2} color="#00d4ff" position={position} />
      <pointLight intensity={1.5} color="#00ffff" position={position} />
    </Sphere>
  )
}

export default QuantumSphere

