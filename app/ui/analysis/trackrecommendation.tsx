"use client";
import {motion} from "framer-motion"
import { trackRecommendations } from "@/app/lib/fetchData"
import React from "react"
import { Track } from "@/app/lib/types"
import { useRouter } from "next/navigation";
import { cleanSongTitle } from "@/app/lib/utils";


export default function TrackRecommendations() {
  const [tracks, setTracks] = React.useState([] as Track[])
  
  const router = useRouter();
  const fetchRecommendations = async () => {
    const data = await trackRecommendations();
    if(data) {
      setTracks(data.tracks);
    }
  }

  const handleTrackRedirect = (href: string) => {
    router.push(href);
  }

  React.useEffect(() => {
    fetchRecommendations()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Track Recommendations</h2>
      <ul className="space-y-2">
        {tracks.map((track, index) => (
          <li onClick={() => {
            handleTrackRedirect(track.external_urls.spotify)
          }} key={index} className="flex hover:cursor-pointer items-center p-2 hover:bg-gray-100 rounded transition-colors">
            <div className="w-8 h-8 bg-[#1DB954] text-white rounded-full flex items-center justify-center mr-3">
              {index + 1}
            </div>
            <div>
              <p className="font-medium">{cleanSongTitle(track.name)}</p>
              <p className="text-sm text-gray-600">{track.artists[0].name}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}