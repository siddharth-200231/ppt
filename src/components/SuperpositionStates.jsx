import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const SuperpositionStates = ({ position = [0, 0, 0], count = 6 }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Rotate all shadow states around central qubit
    groupRef.current.rotation.y = time * 0.5
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2

    // Animate individual shadow states
    groupRef.current.children.forEach((child, index) => {
      if (child.type === 'Group') {
        const angle = (index / count) * Math.PI * 2
        const radius = 1.5
        const phase = time + index * 0.5

        child.position.x = Math.cos(angle + phase) * radius
        child.position.y = Math.sin(angle + phase * 0.7) * radius * 0.5
        child.position.z = Math.sin(angle + phase * 0.5) * radius * 0.8

        // Fade in/out for ghostly effect
        if (child.children[0] && child.children[0].material) {
          child.children[0].material.opacity = 0.3 + Math.sin(phase * 2) * 0.2
        }
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central qubit - more solid */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#00C6FF"
          emissive="#00C6FF"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={1}
        />
      </Sphere>

      {/* Shadow states - ghostly versions rotating around */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / count) * Math.PI * 2
        const radius = 1.5
        return (
          <group key={index} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <Sphere args={[0.3, 16, 16]}>
              <meshStandardMaterial
                color="#4AF0FF"
                emissive="#4AF0FF"
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
                wireframe={false}
              />
            </Sphere>
            <pointLight
              position={[0, 0, 0]}
              intensity={0.5}
              color="#4AF0FF"
              distance={2}
            />
          </group>
        )
      })}
    </group>
  )
}

export default SuperpositionStates

