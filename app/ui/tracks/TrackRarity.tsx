"use client"; 

import React, {useState, useEffect, useRef} from 'react';
import { TopTracks, Track } from '@/app/lib/types';
import { useInView } from 'framer-motion';
import { fetchTopTracks } from '@/app/lib/fetchData';

export default function TrackRarity() {
    const [rarityScore, setRarityScore] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        getTopTracks();
    }, [])

    async function getTopTracks() {
        const data = await fetchTopTracks("long_term", "10");
        if(data) {
            let temp = 0;
            data.items.forEach((track: Track) => {
                track.popularity > 65 ? temp += 1 : temp += 0;
            });
            temp = (temp / data.items.length) * 100;
            setRarityScore(temp);
        }
    }

    useEffect(() => {
        if (isInView) {
        const targetScore = rarityScore // This can be dynamically set based on actual data
        const duration = 1500 // 2 seconds for the animation
        const steps = 60 // Update every 33ms for smooth animation

        let currentStep = 0
        const interval = setInterval(() => {
            currentStep++
            const progress = currentStep / steps
            setRarityScore(Math.round(targetScore * progress))

            if (currentStep >= steps) {
            clearInterval(interval)
            }
        }, duration / steps)

        return () => clearInterval(interval)
        }
    }, [])

    return (
        <div className="flex justify-center mb-8">
            <div ref={ref} className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-2xl w-full">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Track Rarity Score</h2>
                <div className="flex flex-col items-center">
                    <div className="text-4xl sm:text-6xl font-bold text-[#1DB954] mb-4">{rarityScore}</div>
                    <p className="text-base sm:text-xl text-center mb-4">
                        {rarityScore < 30 && "Your music taste is quite mainstream. You enjoy popular hits that many others love too!"}
                        {rarityScore >= 30 && rarityScore < 70 && "Your music taste is a nice blend of popular tracks and some lesser-known gems. You have a good balance!"}
                        {rarityScore >= 70 && "Your music taste is quite unique! You have a knack for discovering tracks that aren't on everyone's playlist."}
                    </p>
                    <p className="text-sm sm:text-lg text-center">
                        Your track rarity score indicates how unique your music taste is compared to other users.
                    </p>
                </div>
            </div>
          </div>
    )
}