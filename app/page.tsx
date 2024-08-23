"use client";
import { redirect } from "next/navigation";
import { authenticate } from "./lib/auth";
import { Button } from "./ui/button";

export default function Home() {
  const handleRedirect = async () => {
    const url = await authenticate();
    if (!url) return
    location.href = url;
  }

  return (
    <main className="font-mono font-bold h-screen flex items-center justify-center">
      <div>
        <form>
          <Button onClick={handleRedirect} className="hover:shadow-md hover:shadow-gray-500" style={{background: "#1DB954"}}>Use Spotify</Button>
        </form>
      </div>
    </main>
  );
}
