import Link from 'next/link'
import { Music } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <Music className="w-24 h-24 text-[#1DB954] mx-auto mb-6 hover:scale-110 " />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! You lost the track.</p>
        <Link 
          href="/" 
          className="bg-[#1DB954] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1ED760] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}