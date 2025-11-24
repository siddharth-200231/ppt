import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

const PuzzleLock = ({ position = [0, 0, 0], unlocked = false }) => {
  const groupRef = useRef()
  const lockRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    // Lock animation
    if (lockRef.current) {
      if (unlocked) {
        lockRef.current.rotation.z = THREE.MathUtils.lerp(
          lockRef.current.rotation.z,
          Math.PI / 4,
          0.05
        )
        // Green glow when unlocked
        lockRef.current.material.emissive.setHex(0x00ff00)
      } else {
        lockRef.current.rotation.z = THREE.MathUtils.lerp(
          lockRef.current.rotation.z,
          0,
          0.05
        )
        // Red glow when locked
        lockRef.current.material.emissive.setHex(0xff0000)
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Lock base */}
      <Box args={[1, 1.5, 0.3]}>
        <meshStandardMaterial
          color="#333"
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* Lock mechanism */}
      <group ref={lockRef}>
        <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0, 0.8, 0.2]}>
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#ff0000"
            emissiveIntensity={0.5}
            metalness={0.8}
          />
        </Cylinder>
      </group>

      {/* Keyhole */}
      <Cylinder args={[0.15, 0.15, 0.2, 8]} position={[0, 0.5, 0.25]}>
        <meshStandardMaterial
          color="#0A0F1E"
          emissive="#00C6FF"
          emissiveIntensity={0.3}
        />
      </Cylinder>
    </group>
  )
}

export default PuzzleLock

