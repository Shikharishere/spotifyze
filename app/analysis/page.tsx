"use client";
import { motion } from 'framer-motion'
import ValenceRecommendations  from '../ui/analysis/valencerecommendations'
import TopGenres from '../ui/analysis/topGenre';
import React from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../lib/auth';

export default function Page() {
  const router = useRouter();
  React.useEffect(() => {
    check();
  }, []);

  async function check() {
    const auth = await checkAuth();
    if(!auth) {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-grow pt-24">
        <section className="text-center py-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Your Spotify Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Dive into your music preferences and discover insights about your listening habits
          </motion.p>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <ValenceRecommendations />
	      <TopGenres />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Spotifyze. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
