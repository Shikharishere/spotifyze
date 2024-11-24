import {motion} from "framer-motion"

export default function ValenceRecommendations() {
  const valences = [
    { name: "Happy", value: 0.8 },
    { name: "Energetic", value: 0.7 },
    { name: "Calm", value: 0.4 },
    { name: "Melancholic", value: 0.3 },
    { name: "Excited", value: 0.9 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Recommended Valence</h2>
      <ul className="space-y-2">
        {valences.map((valence, index) => (
          <li key={index} className="flex items-center justify-between p-2">
            <span>{valence.name}</span>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#1DB954] h-2.5 rounded-full"
                style={{ width: `${valence.value * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}