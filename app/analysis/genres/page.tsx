"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import RecentGenres from '@/app/ui/genre/RecentGenres';
import ObscureGenre from '@/app/ui/genre/ObscureGenre';
import GenreExploration from '@/app/ui/genre/GenreExploration'; 
import { checkAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

export default function GenresPage() {
  const router = useRouter();
    const [isClient, setIsClient] = useState(false);
  React.useEffect(() => {
    check();
    setIsClient(true);
  }, []);

  async function check() {
    const auth = await checkAuth();
    if(!auth) {
      router.push("/")
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
            Your Genre Analysis
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" suppressHydrationWarning={true}>
            {isClient && <RecentGenres />}
            {isClient && <ObscureGenre/>}
            
          </div>
          {isClient && <GenreExploration/>}
          
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 Spotifyze. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

