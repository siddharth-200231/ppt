import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const QubitSphere = ({ expand = false }) => {
  const pointsRef = useRef()
  const meshRef = useRef()

  // Generate qubit particles in expanding sphere pattern
  const qubits = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const radius = expand ? 8 : 2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Spherical distribution with varying radii for web effect
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = radius * (0.8 + Math.random() * 0.4)

      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
    }

    return positions
  }, [expand])

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle rotation
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15

      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      pointsRef.current.scale.setScalar(pulse)
    }

    // Expanding animation
    if (expand && meshRef.current) {
      const elapsed = state.clock.elapsedTime
      const targetScale = Math.min(1 + elapsed * 0.2, 3)
      meshRef.current.scale.setScalar(targetScale)
    }
  })

  return (
    <group ref={meshRef}>
      <Points ref={pointsRef} positions={qubits} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00C6FF"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      {/* Web connections */}
      <mesh>
        <sphereGeometry args={[expand ? 8 : 2, 32, 32]} />
        <meshBasicMaterial
          color="#4AF0FF"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default QubitSphere

