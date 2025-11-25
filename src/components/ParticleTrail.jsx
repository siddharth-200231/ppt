import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ParticleTrail = ({ source, target, color = '#00C6FF', particleCount = 100 }) => {
  const pointsRef = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    return positions
  }, [particleCount])

  useFrame((state) => {
    if (!pointsRef.current || !source || !target) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    // Create flowing particles along the trail
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const progress = ((i / particleCount) + (time * 0.5) % 1) % 1
      
      // Interpolate between source and target
      positions[i3] = source[0] + (target[0] - source[0]) * progress
      positions[i3 + 1] = source[1] + (target[1] - source[1]) * progress
      positions[i3 + 2] = source[2] + (target[2] - source[2]) * progress
      
      // Add some randomness for organic flow
      positions[i3] += Math.sin(time + i) * 0.2
      positions[i3 + 1] += Math.cos(time + i) * 0.2
      positions[i3 + 2] += Math.sin(time * 2 + i) * 0.1
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.1}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default ParticleTrail

