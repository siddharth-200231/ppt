import { motion } from 'framer-motion'
import { Box, Text } from '@react-three/drei'

const BenefitBadges = ({ badges = ['Cost Reduction', 'Rapid Insights', 'Quantum Solutions'] }) => {
  return (
    <group>
      {badges.map((badge, index) => (
        <group key={index} position={[(index - 1) * 3.5, 0, 0]}>
          <Box args={[2.8, 1.2, 0.2]}>
            <meshStandardMaterial
              color="#0A0F1E"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.22}
            color="#00C6FF"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.5}
            textAlign="center"
          >
            {badge}
          </Text>

          {/* Subtle glow effect */}
          <Box args={[2.9, 1.3, 0.1]} position={[0, 0, -0.05]}>
            <meshStandardMaterial
              color="#00C6FF"
              emissive="#00C6FF"
              emissiveIntensity={0.15}
              transparent
              opacity={0.2}
            />
          </Box>
        </group>
      ))}
    </group>
  )
}

export default BenefitBadges

