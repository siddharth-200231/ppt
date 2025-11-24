import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import * as THREE from 'three'

const ServiceIcons = ({ services, assembled = false }) => {
  const groupRef = useRef()
  const serviceRefs = useRef([])

  const initialPositions = services.map((_, i) => {
    const angle = (i / services.length) * Math.PI * 2
    const radius = 5
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: (Math.random() - 0.5) * 3,
    }
  })

  const [targetPositions] = useState(() => {
    return services.map((_, i) => {
      const spacing = 2.5
      const startX = -(services.length - 1) * spacing / 2
      return {
        x: startX + i * spacing,
        y: -1,
        z: -3,
      }
    })
  })

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation when not assembled
      if (!assembled) {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      } else {
        groupRef.current.rotation.y = 0
      }
    }

    // Smooth transition to target positions
    serviceRefs.current.forEach((ref, index) => {
      if (ref && assembled) {
        const current = ref.position
        const target = targetPositions[index]
        current.x = THREE.MathUtils.lerp(current.x, target.x, 0.05)
        current.y = THREE.MathUtils.lerp(current.y, target.y, 0.05)
        current.z = THREE.MathUtils.lerp(current.z, target.z, 0.05)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {services.map((service, index) => (
        <group
          key={index}
          ref={el => { serviceRefs.current[index] = el }}
          position={[initialPositions[index].x, initialPositions[index].y, initialPositions[index].z]}
        >
          {/* Service card */}
          <Box args={[2, 1.5, 0.2]}>
            <meshStandardMaterial
              color="#0A0F1E"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          
          {/* Icon */}
          <Text
            position={[0, 0.3, 0.15]}
            fontSize={0.6}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
          >
            {service.icon}
          </Text>
          
          {/* Title */}
          <Text
            position={[0, -0.2, 0.15]}
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
            textAlign="center"
          >
            {service.title}
          </Text>

          {/* Glow effect */}
          <Box args={[2.1, 1.6, 0.1]} position={[0, 0, -0.05]}>
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </Box>
        </group>
      ))}
    </group>
  )
}

export default ServiceIcons
