import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PossibilitiesWeb = ({ expanded = false }) => {
  const groupRef = useRef()

  // Create web of possibilities with connecting lines
  const connections = useMemo(() => {
    const points = 50
    const positions = []
    const indices = []

    // Generate nodes
    for (let i = 0; i < points; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = expanded ? 5 + Math.random() * 3 : 2 + Math.random() * 1
      
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    }

    // Connect nearby nodes
    for (let i = 0; i < points; i++) {
      for (let j = i + 1; j < points; j++) {
        const i3 = i * 3
        const j3 = j * 3
        
        const dx = positions[i3] - positions[j3]
        const dy = positions[i3 + 1] - positions[j3 + 1]
        const dz = positions[i3 + 2] - positions[j3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (dist < (expanded ? 3 : 1.5)) {
          indices.push(i, j)
        }
      }
    }

    return { positions: new Float32Array(positions), indices }
  }, [expanded])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.positions.length / 3}
            array={connections.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={connections.indices.length}
            array={new Uint16Array(connections.indices)}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00C6FF" opacity={0.5} transparent />
      </lineSegments>
    </group>
  )
}

export default PossibilitiesWeb

