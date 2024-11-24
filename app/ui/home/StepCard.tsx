import { motion } from 'framer-motion'

export default function StepCard({ number, title, description }: { number: number, title: string, description: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: number * 0.1 }}
        className="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <div className="w-12 h-12 bg-[#1DB954] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    )
  }