import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const MazeSolver = ({ solved = false }) => {
  const pathsRef = useRef([])

  // Create multiple paths converging
  const paths = useMemo(() => {
    const pathCount = 8
    const paths = []

    for (let i = 0; i < pathCount; i++) {
      const angle = (i / pathCount) * Math.PI * 2
      const points = []
      const segments = 20

      for (let j = 0; j <= segments; j++) {
        const progress = j / segments
        const distance = 4 * (1 - progress)
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const z = (Math.random() - 0.5) * 0.5
        
        // Converge to center
        points.push([
          x * (1 - progress * 0.8),
          y * (1 - progress * 0.8),
          z
        ])
      }

      paths.push(points)
    }

    return paths
  }, [])

  useFrame((state) => {
    if (solved && pathsRef.current) {
      // Animate paths converging
      pathsRef.current.forEach((pathRef, index) => {
        if (pathRef) {
          const progress = Math.min((state.clock.elapsedTime - 2) * 0.5, 1)
          pathRef.opacity = 1 - progress * 0.8
        }
      })
    }
  })

  return (
    <group>
      {paths.map((path, index) => (
        <Line
          key={index}
          ref={el => { pathsRef.current[index] = el }}
          points={path}
          color={index % 2 === 0 ? "#00C6FF" : "#4AF0FF"}
          lineWidth={2}
        />
      ))}
    </group>
  )
}

export default MazeSolver

