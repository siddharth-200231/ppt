import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import * as THREE from 'three'

const ConveyorBelt = ({ speed = 1, onStop }) => {
  const groupRef = useRef()
  const bitsRef = useRef([])
  const stopped = useRef(false)

  const bits = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: Math.random() > 0.5 ? '1' : '0',
      x: -8 + i * 1.5,
      y: -1,
      z: 0,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current || stopped.current) return

    const elapsedTime = state.clock.elapsedTime

    // Move bits along conveyor
    bits.forEach((bit, index) => {
      if (bitsRef.current[index]) {
        bitsRef.current[index].position.x = bit.x + (elapsedTime * speed)
        
        // Reset position when off screen
        if (bitsRef.current[index].position.x > 8) {
          bitsRef.current[index].position.x = -8
        }
      }
    })

    // Stop after animation
    if (elapsedTime > 15 && !stopped.current) {
      stopped.current = true
      if (onStop) onStop()
    }
  })

  return (
    <group ref={groupRef}>
      {/* Conveyor belt base */}
      <Box args={[20, 0.2, 2]} position={[0, -1.1, 0]}>
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Conveyor belt tracks */}
      {[-1, 1].map((y, i) => (
        <Box key={i} args={[20, 0.1, 2.2]} position={[0, -1 + y * 0.5, 0]}>
          <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
        </Box>
      ))}

      {/* Bits */}
      {bits.map((bit, index) => (
        <group key={bit.id} ref={el => { bitsRef.current[index] = el }}>
          <Box args={[0.8, 0.8, 0.8]} position={[bit.x, bit.y, bit.z]}>
            <meshStandardMaterial 
              color={bit.value === '1' ? '#00C6FF' : '#4AF0FF'}
              emissive={bit.value === '1' ? '#00C6FF' : '#4AF0FF'}
              emissiveIntensity={0.3}
            />
          </Box>
          <Text
            position={[bit.x, bit.y, bit.z + 0.5]}
            fontSize={0.5}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {bit.value}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default ConveyorBelt

