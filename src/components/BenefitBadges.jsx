import { motion } from 'framer-motion'
import { Box, Text } from '@react-three/drei'

const BenefitBadges = ({ badges = ['Cost Reduction', 'Rapid Insights', 'Quantum-Powered Solutions'] }) => {
  return (
    <group>
      {badges.map((badge, index) => (
        <group key={index} position={[(index - 1) * 3, 0, 0]}>
          <Box args={[2.5, 1, 0.2]}>
            <meshStandardMaterial
              color="#0A0F1E"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.25}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.2}
            textAlign="center"
          >
            {badge}
          </Text>

          {/* Glow effect */}
          <Box args={[2.6, 1.1, 0.1]} position={[0, 0, -0.05]}>
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

export default BenefitBadges

