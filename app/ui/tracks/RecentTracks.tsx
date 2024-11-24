"use client";

import React from 'react';
import { fetchRecentTracks } from '@/app/lib/fetchData';
import { recentTracks } from '@/app/lib/types';

export default function RecentTracks() {
    const [recentlyPlayed, setRecentlyPlayed] = React.useState({} as recentTracks);

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await fetchRecentTracks();
        if(data) {
            setRecentlyPlayed(data);
        }
    }

    if(!recentlyPlayed.items) {
        return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8"></div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recently Played</h2>
            <ul className="space-y-4">
              {recentlyPlayed?.items?.map((temp, index) => (
                <li onClick={
                    () => {
                        window.open(temp.track.external_urls.spotify, '_blank');
                }} key={index} className="flex items-center p-2 hover:bg-gray-100 hover:cursor-pointer rounded transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1DB954] text-white rounded-full flex items-center justify-center mr-3 text-xs sm:text-sm">
                        {index + 1}
                    </div>
                    <div>
                        <p className="font-medium text-sm sm:text-base">{temp.track.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{temp.track.artists[0].name}</p>
                    </div>
                </li>
              ))}
            </ul>
        </div>
    );
}