import { motion } from 'framer-motion'

export default function FeatureItem({ icon, text }: {icon: React.ReactNode, text: string}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-3"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-[#1DB954] text-white rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span>{text}</span>
    </motion.li>
  )
}