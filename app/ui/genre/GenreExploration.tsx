"use client"; 

import React, { useState, useEffect, useRef } from 'react'
import { fetchObscureGenre } from '@/app/lib/fetchData';
import { useInView } from 'framer-motion';
import { ObscureGenres } from '@/app/lib/types';
import dynamic from 'next/dynamic';

function GenreExploration() {
    const [data, setData] = useState<ObscureGenres>({mainstream: 0, niche: 0});
    const [explorationScore, setExplorationScore] = useState<number>(0);
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetchObscureGenre();
        if(data) {
            const score = Math.round((data.niche / (data.mainstream + data.niche)) * 100);
            setData(data);
            setExplorationScore(score);
        }
    }

    useEffect(() => {
        if (isInView) {
        const targetScore = explorationScore; // This can be dynamically set based on actual data
        const duration = 1500 // 2 seconds for the animation
        const steps = 60 // Update every 33ms for smooth animation


        let currentStep = 0
        const interval = setInterval(() => {
            currentStep++
            const progress = currentStep / steps
            const value = Math.round(progress * targetScore)
            setExplorationScore(value)
            if (currentStep >= steps) {
            clearInterval(interval)
            }
        }, duration / steps)

        return () => clearInterval(interval)
        }
    }, [isInView])

    return (
        <div className="flex justify-center mb-8">
            <div ref={ref} className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-2xl w-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Genre Exploration Score</h2>
              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-6xl font-bold text-[#1DB954] mb-4">{explorationScore}</div>
                <p className="text-base sm:text-xl text-center mb-4">
                  {explorationScore < 30 && "You tend to stick to your favorite genres. Try exploring some new sounds!"}
                  {explorationScore >= 30 && explorationScore < 70 && "You have a good balance between exploring new genres and enjoying your favorites."}
                  {explorationScore >= 70 && "You're a true musical explorer! You love discovering new genres and sounds."}
                </p>
                <p className="text-xs sm:text-lg text-center">
                  Your genre exploration score indicates how adventurous you are in discovering new genres.
                </p>
              </div>
            </div>
        </div>
    );
}

export default dynamic (() => Promise.resolve(GenreExploration), {ssr: false})
