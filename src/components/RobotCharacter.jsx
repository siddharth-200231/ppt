import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text } from '@react-three/drei'
import * as THREE from 'three'

const RobotCharacter = ({ position = [0, 0, 0], frustrated = false, onTryKey }) => {
  const groupRef = useRef()
  const armRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    // Slight idle animation
    const bob = Math.sin(state.clock.elapsedTime * 2) * 0.05
    groupRef.current.position.y = position[1] + bob

    // Arm movement when trying keys
    if (armRef.current && onTryKey) {
      const time = state.clock.elapsedTime
      const keyInterval = 2 // Try a key every 2 seconds
      
      if (Math.floor(time % keyInterval) === 0 && Math.floor((time * 10) % 10) < 2) {
        armRef.current.rotation.z = THREE.MathUtils.lerp(
          armRef.current.rotation.z,
          -0.5,
          0.1
        )
        if (onTryKey) onTryKey()
      } else {
        armRef.current.rotation.z = THREE.MathUtils.lerp(
          armRef.current.rotation.z,
          0,
          0.1
        )
      }
    }

    // Frustrated shake
    if (frustrated) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Robot body */}
      <Box args={[1, 1.5, 0.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#00C6FF" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Robot head */}
      <Box args={[1, 1, 0.8]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#4AF0FF" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Eyes */}
      <Box args={[0.2, 0.2, 0.1]} position={[-0.3, 1.6, 0.5]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.2, 0.2, 0.1]} position={[0.3, 1.6, 0.5]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </Box>

      {/* Arms */}
      <group ref={armRef}>
        <Box args={[0.3, 1, 0.3]} position={[-0.8, 0.5, 0]}>
          <meshStandardMaterial color="#00C6FF" metalness={0.8} />
        </Box>
        <Box args={[0.3, 1, 0.3]} position={[0.8, 0.5, 0]}>
          <meshStandardMaterial color="#00C6FF" metalness={0.8} />
        </Box>
      </group>

      {/* Legs */}
      <Box args={[0.3, 0.8, 0.3]} position={[-0.3, -0.5, 0]}>
        <meshStandardMaterial color="#00C6FF" metalness={0.8} />
      </Box>
      <Box args={[0.3, 0.8, 0.3]} position={[0.3, -0.5, 0]}>
        <meshStandardMaterial color="#00C6FF" metalness={0.8} />
      </Box>
    </group>
  )
}

export default RobotCharacter

