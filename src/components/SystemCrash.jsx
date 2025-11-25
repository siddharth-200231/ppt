import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text } from '@react-three/drei'
import * as THREE from 'three'

const SystemCrash = ({ crashed = false }) => {
  const groupRef = useRef()
  const fileIconsRef = useRef([])

  // Generate file icons
  const fileIcons = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 5,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      vz: (Math.random() - 0.5) * 0.02,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    if (crashed) {
      // Explode file icons
      fileIcons.forEach((icon, index) => {
        if (fileIconsRef.current[index]) {
          const ref = fileIconsRef.current[index]
          const time = state.clock.elapsedTime - (crashed ? 0 : 5)
          
          ref.position.x += icon.vx * (time * 2)
          ref.position.y += icon.vy * (time * 2)
          ref.position.z += icon.vz * (time * 2)
          
          ref.rotation.x += 0.1
          ref.rotation.y += 0.1
          ref.rotation.z += 0.1

          // Fade out
          if (ref.children[0] && ref.children[0].material) {
            ref.children[0].material.opacity = Math.max(0, 1 - time * 0.3)
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Server/System representation */}
      <Box args={[3, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={crashed ? "#ff0000" : "#333"}
          emissive={crashed ? "#ff0000" : "#00C6FF"}
          emissiveIntensity={crashed ? 0.8 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* File icons that explode */}
      {fileIcons.map((icon, index) => (
        <group
          key={icon.id}
          ref={el => { fileIconsRef.current[index] = el }}
          position={[icon.x, icon.y, icon.z]}
        >
          <Box args={[0.3, 0.4, 0.05]}>
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.5}
              transparent
              opacity={1}
            />
          </Box>
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.1}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            FILE
          </Text>
        </group>
      ))}

      {/* Error indicators */}
      {crashed && (
        <>
          <Text
            position={[0, 2, 0]}
            fontSize={0.5}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            SYSTEM OVERLOAD
          </Text>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="#ff6666"
            anchorX="center"
            anchorY="middle"
          >
            TOO MUCH DATA
          </Text>
        </>
      )}
    </group>
  )
}

export default SystemCrash

