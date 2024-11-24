import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

interface AuthResultProps {
  success: boolean
  message: string
}

const AuthResult: React.FC<AuthResultProps> = ({ success, message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "tween",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
        className={`bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center `}
      >
        {success ? (
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        )}
        <h2 className={`text-2xl font-bold mb-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
          {success ? 'Authentication Successful' : 'Authentication Failed'}
        </h2>
        <p className="text-gray-600">{message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-6 px-6 py-2 rounded-full text-white font-semibold ${
            success ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={() => {
            window.location.href = success ? '/analysis' : '/'
          }}
        >
          {success ? 'Continue to Dashboard' : 'Try Again'}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default AuthResult