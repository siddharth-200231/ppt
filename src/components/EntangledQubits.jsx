import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const EntangledQubits = () => {
  const qubit1Ref = useRef()
  const qubit2Ref = useRef()
  const lineRef = useRef()

  // Create line geometry and material
  const { lineGeometry, lineMaterial } = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(6) // 2 points * 3 coordinates
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.LineBasicMaterial({ 
      color: '#00C6FF', 
      transparent: true, 
      opacity: 0.6 
    })
    return { lineGeometry: geometry, lineMaterial: material }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const radius = 2
    const speed = 0.8

    // Orbit qubits around each other
    if (qubit1Ref.current && qubit2Ref.current) {
      qubit1Ref.current.position.x = Math.cos(time * speed) * radius
      qubit1Ref.current.position.y = Math.sin(time * speed) * radius
      qubit1Ref.current.position.z = Math.sin(time * speed * 0.5) * 0.5

      qubit2Ref.current.position.x = -Math.cos(time * speed) * radius
      qubit2Ref.current.position.y = -Math.sin(time * speed) * radius
      qubit2Ref.current.position.z = -Math.sin(time * speed * 0.5) * 0.5

      // Rotate qubits
      qubit1Ref.current.rotation.x += 0.02
      qubit1Ref.current.rotation.y += 0.02
      qubit2Ref.current.rotation.x += 0.02
      qubit2Ref.current.rotation.y += 0.02

      // Update connection line
      if (lineRef.current && lineRef.current.geometry) {
        const positions = lineRef.current.geometry.attributes.position
        const pos1 = qubit1Ref.current.position
        const pos2 = qubit2Ref.current.position
        
        positions.setXYZ(0, pos1.x, pos1.y, pos1.z)
        positions.setXYZ(1, pos2.x, pos2.y, pos2.z)
        positions.needsUpdate = true
      }
    }
  })

  return (
    <group>
      {/* Qubit 1 */}
      <group ref={qubit1Ref}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
        <pointLight intensity={2} color="#00C6FF" />
      </group>

      {/* Qubit 2 */}
      <group ref={qubit2Ref}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial
            color="#4AF0FF"
            emissive="#4AF0FF"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
        <pointLight intensity={2} color="#4AF0FF" />
      </group>

      {/* Glowing connection thread */}
      <primitive 
        ref={lineRef}
        object={new THREE.Line(lineGeometry, lineMaterial)} 
      />
    </group>
  )
}

export default EntangledQubits
