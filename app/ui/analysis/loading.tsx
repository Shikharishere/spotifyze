import React from 'react'
import { motion } from 'framer-motion'

const LoadingSphere: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-24 h-24">
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full border-4 border-[#1DB954] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingSphere