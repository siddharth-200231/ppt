import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const EnergyWaveEntanglement = ({ source, target, color = '#00C6FF' }) => {
  const meshRef = useRef()
  const waveRefs = useRef([])

  // Create wave geometry
  const waveGeometry = useMemo(() => {
    const segments = 32
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array((segments + 1) * 3)
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !source || !target) return

    const time = state.clock.elapsedTime
    const geometry = meshRef.current.geometry
    const positions = geometry.attributes.position.array
    const segments = positions.length / 3 - 1

    // Create animated wave between source and target
    for (let i = 0; i <= segments; i++) {
      const i3 = i * 3
      const progress = i / segments
      
      // Base position interpolated
      const baseX = source[0] + (target[0] - source[0]) * progress
      const baseY = source[1] + (target[1] - source[1]) * progress
      const baseZ = source[2] + (target[2] - source[2]) * progress
      
      // Add wave effect perpendicular to the line
      const waveAmplitude = 0.3
      const waveFrequency = 3
      const wavePhase = time * 2 + progress * Math.PI * waveFrequency
      
      // Perpendicular direction for wave
      const dir = new THREE.Vector3(
        target[0] - source[0],
        target[1] - source[1],
        target[2] - source[2]
      ).normalize()
      
      const perp = new THREE.Vector3(-dir.y, dir.x, 0).normalize()
      
      positions[i3] = baseX + perp.x * Math.sin(wavePhase) * waveAmplitude
      positions[i3 + 1] = baseY + perp.y * Math.sin(wavePhase) * waveAmplitude
      positions[i3 + 2] = baseZ + Math.cos(wavePhase) * waveAmplitude * 0.5
    }

    geometry.attributes.position.needsUpdate = true

    // Animate opacity for energy pulse effect
    if (meshRef.current.material) {
      meshRef.current.material.opacity = 0.6 + Math.sin(time * 3) * 0.2
    }
  })

  return (
    <group>
      {/* Energy wave line */}
      <line ref={meshRef} geometry={waveGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          linewidth={3}
        />
      </line>
      
      {/* Glowing particles along the wave */}
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3([
          new THREE.Vector3(...source),
          new THREE.Vector3(...target)
        ]), 64, 0.05, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default EnergyWaveEntanglement

