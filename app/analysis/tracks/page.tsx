"use client";
import React, { useState} from 'react'
import { motion} from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import TopTrackGraph from '@/app/ui/tracks/TopTrackGraph';
import TopTracksListed from '@/app/ui/tracks/TopTracksListed';
import TrackRarity from '@/app/ui/tracks/TrackRarity';
import RecentTracks from '@/app/ui/tracks/RecentTracks';
import { checkAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

export default function TracksPage() {
  const router = useRouter();
  React.useEffect(() => {
    check();
  }, [])

  async function check() {
    const auth = await checkAuth();
    if(!auth) {
      router.push("/");
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold mb-8 text-center"
          >
            Your Top Tracks
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <TopTrackGraph/>
            <TopTracksListed/>
          </div>

          <TrackRarity />

          <RecentTracks />
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 Spotifyze. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



