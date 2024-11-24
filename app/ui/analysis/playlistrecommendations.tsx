import { motion } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"
import React from "react"
import { playlistRecommendations } from "@/app/lib/fetchData";
import { Playlist } from "@/app/lib/types";

export default function PlaylistRecommendations() {
  const [playlists, setPlaylists] = React.useState({} as Playlist);
  

  const fetchRecommendations = async () => {
    const data = await playlistRecommendations();
    console.log(data)
    if(data) {
      setPlaylists(data);
    }
  }

  React.useEffect(() => {
      fetchRecommendations()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-semibold mb-6">{playlists.message}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {playlists.playlists?.items.map((playlist, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="relative w-full h-48">
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-500">{playlist.description}</p>
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                className="flex items-center mt-2 text-sm text-gray-600 hover:text-green-400"
              >
                <Play size={16} className="mr-1" />
                Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}