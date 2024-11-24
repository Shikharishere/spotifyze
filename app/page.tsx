"use client";
import { checkAuth, getAuthorizationURL, refreshToken } from "./lib/auth";
import {motion} from "framer-motion";
import { ArrowRight, BarChart2, Headphones, Mic } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FeatureItem from "./ui/home/FeatureItem";
import StepCard from "./ui/home/StepCard";
import SpotifyIcon from "./ui/home/spotifyicon";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRedirect = async () => {
    const check = await checkAuth();
    if(check == "Id cookie found") {
      toast("Auto authenticating 🚀")
      await refreshToken();
      router.push("/analysis")
    } else {
      const url = await getAuthorizationURL();
      if (!url) return
      location.href = url;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1DB954] px-6 py-2 rounded-full text-sm font-semibold border border-[#1DB954] hover:bg-[#1DB954] hover:text-white  transition-colors"
              onClick={handleRedirect}
            >
              Connect Spotify
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1DB954] px-6 py-2 rounded-full text-sm font-semibold border border-[#1DB954] hover:bg-[#1DB954] hover:text-white transition-colors"
            >
              <Link href="/analysis">Analysis</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1DB954] px-6 py-2 rounded-full text-sm font-semibold border border-[#1DB954] hover:bg-[#1DB954] hover:text-white transition-colors"
            >
              <Link href="/about">About</Link>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow pt-20">
        <section className="text-center py-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-transparent bg-clip-text"
          >
            Welcome to Spotifyze
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover insights about your music taste like never before with our advanced Spotify analytics
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              onClick={handleRedirect}
              href=""
              className="bg-[#1DB954] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1ed760] transition-colors inline-flex items-center"
            >
              Continue With Spotify <SpotifyIcon /> <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Understand Your Music Preferences</h2>
                <p className="text-lg mb-6">
                  Spotifyze analyzes your Spotify listening history to provide deep insights into your
                  music taste. Discover your top artists, tracks, and genres, and see how they&apos;ve
                  evolved over time.
                </p>
                <ul className="space-y-4">
                  <FeatureItem icon={<Mic />} text="Explore your favorite artists" />
                  <FeatureItem icon={<Headphones />} text="Uncover your most-played tracks" />
                  <FeatureItem icon={<BarChart2 />} text="Visualize your genre preferences" />
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
              >
                <Image
                  src="/pexels-enginakyurt-2036695.png?height=600&width=800"
                  alt="Music analysis visualization"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard number={1} title="Connect Your Spotify" description="Securely link your Spotify account to Spotifyze" />
              <StepCard number={2} title="Analyze Your Data" description="Our algorithms process your listening history" />
              <StepCard number={3} title="Get Your Insights" description="View personalized charts, graphs, and recommendations" />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-br from-[#1DB954] to-[#1ed760] text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Already authorized with Spotify?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Start your musical journey with Spotifyze today and uncover the patterns in your listening habits</p>
            <Link
              href="/analysis"
              className="bg-white text-[#1DB954] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Begin Your Analysis <ArrowRight className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Spotifyze</h3>
              <p className="text-gray-400">Discover your music DNA</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2023 Spotifyze. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
