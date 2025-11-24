import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Line, Text } from '@react-three/drei'
import * as THREE from 'three'

const WorldMap = ({ expanded = false }) => {
  const groupRef = useRef()

  // Major tech hub locations (simplified)
  const hubs = [
    { name: 'USA', position: [-3, 2, 0], scale: 1 },
    { name: 'Europe', position: [0, 2, 0], scale: 1 },
    { name: 'India', position: [3, -1, 0], scale: 1.5 }, // LTI HQ - larger
    { name: 'Asia', position: [4, 1, 0], scale: 1 },
  ]

  const [connections, setConnections] = useState([])

  useEffect(() => {
    if (expanded) {
      // Connect India to all other hubs
      const indiaIndex = 2
      const newConnections = hubs
        .map((_, i) => (i !== indiaIndex ? [indiaIndex, i] : null))
        .filter(Boolean)
      setConnections(newConnections)
    }
  }, [expanded])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* World map base (simplified) */}
      <mesh>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial
          color="#0A0F1E"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Tech hubs */}
      {hubs.map((hub, index) => (
        <group key={index}>
          <Sphere
            args={[hub.scale * 0.3, 16, 16]}
            position={hub.position}
          >
            <meshStandardMaterial
              color={index === 2 ? "#00C6FF" : "#4AF0FF"}
              emissive={index === 2 ? "#00C6FF" : "#4AF0FF"}
              emissiveIntensity={0.8}
            />
          </Sphere>
          <pointLight
            position={hub.position}
            intensity={1}
            color={index === 2 ? "#00C6FF" : "#4AF0FF"}
          />
          <Text
            position={[hub.position[0], hub.position[1] + 0.5, hub.position[2]]}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {hub.name}
          </Text>
        </group>
      ))}

      {/* Connection lines (when expanded) */}
      {expanded && connections.map(([from, to], index) => {
        const fromHub = hubs[from]
        const toHub = hubs[to]
        return (
          <Line
            key={index}
            points={[
              fromHub.position,
              toHub.position,
            ]}
            color="#00C6FF"
            lineWidth={3}
          />
        )
      })}

      {/* Expansion arrow from India */}
      {expanded && (
        <group>
          <mesh>
            <coneGeometry args={[0.3, 1, 8]} />
            <meshStandardMaterial color="#00C6FF" />
          </mesh>
        </group>
      )}
    </group>
  )
}

export default WorldMap

