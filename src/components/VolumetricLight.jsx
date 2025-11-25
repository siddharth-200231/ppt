import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const VolumetricLight = ({ position = [0, 0, 0], color = '#00C6FF', intensity = 2 }) => {
  const lightRef = useRef()
  const meshRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      // Pulsing light intensity
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 1
      lightRef.current.intensity = intensity * pulse
    }

    // Volumetric cone mesh animation
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1
      meshRef.current.scale.y = pulse
      meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Volumetric light cone */}
      <mesh ref={meshRef}>
        <coneGeometry args={[2, 10, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light */}
      <pointLight ref={lightRef} position={[0, 0, 0]} color={color} intensity={intensity} />
      
      {/* Additional spot light for depth */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={0.5}
        color={color}
        intensity={intensity * 0.5}
        castShadow
      />
    </group>
  )
}

export default VolumetricLight

