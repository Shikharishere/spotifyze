import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 ">
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center mx-5">
          <h1 className="text-3xl font-bold mb-4">About Spotifyze</h1>
          <p className="text-lg mb-6">
            A personal project by <Link className='hover:text-[#1DB954]' href="https://github.com/Shikharishere">Shikhar </Link>
          </p>
          <p className="mb-6">
            Spotifyze is a passion project that aims to provide insightful analytics for your Spotify listening habits.
          </p>
          <Link href="/" className="text-[#1DB954] hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}