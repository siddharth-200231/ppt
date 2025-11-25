import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const RevenueChart = ({ animated = false }) => {
  const groupRef = useRef()
  const barsRef = useRef([])

  const data = [
    { year: '2024', value: 20, label: '$20M' },
    { year: '2025', value: 45, label: '$45M' },
    { year: '2026', value: 75, label: '$75M' },
    { year: '2027', value: 120, label: '$120M' },
    { year: '2028', value: 180, label: '$180M' },
  ]

  const maxValue = Math.max(...data.map(d => d.value))

  useFrame((state) => {
    if (groupRef.current && animated) {
      // Gentle rotation for perspective
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }

    // Animate bars rising
    if (animated) {
      barsRef.current.forEach((barRef, index) => {
        if (barRef) {
          const time = state.clock.elapsedTime
          const delay = index * 0.2
          const progress = Math.min((time - delay) * 0.5, 1)
          
          const targetHeight = (data[index].value / maxValue) * 3
          const currentHeight = THREE.MathUtils.lerp(0, targetHeight, progress)
          
          barRef.scale.y = currentHeight / 0.5
          barRef.position.y = currentHeight / 2
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {data.map((item, index) => (
        <group key={index} position={[(index - 2) * 1.5, 0, 0]}>
          <mesh
            ref={el => { barsRef.current[index] = el }}
          >
            <boxGeometry args={[0.8, 0.5, 0.8]} />
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Subtle spark particles - reduced count */}
          {animated && Array.from({ length: 2 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 0.8,
                (item.value / maxValue) * 3 + Math.random() * 0.3,
                (Math.random() - 0.5) * 0.8
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial
                color="#4AF0FF"
                transparent
                opacity={0.5}
              />
            </mesh>
          ))}

          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {item.year}
          </Text>
          <Text
            position={[0, (item.value / maxValue) * 3 + 0.5, 0]}
            fontSize={0.15}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
          >
            {item.label}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default RevenueChart

