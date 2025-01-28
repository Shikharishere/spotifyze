"use client";

import { fetchRecentArtists } from '@/app/lib/fetchData';
import { Artist } from '@/app/lib/types';
import React from 'react';
import dynamic from 'next/dynamic';


function RecentGenres() {
    const [data, setData] = React.useState<Artist[]>([]);
    const [genre, setGenre] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await fetchRecentArtists();
        if(data) {
            setData(data);
			for(let i = 0; i < 5; i++) {
				const artist : Artist = data[i];
				for(let g of artist.genres) {
					genre.push(g);
					setGenre(genre);
				}
			}
			if(genre.length >= 5) {
				setGenre(genre.slice(0, 5));		
			} else {
				setGenre(genre.slice());
			}	
        }
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recently Loved Genres</h2>
            <ul className="space-y-4">
            {genre.map((g, index) => (
                <li key={index} className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1DB954] text-white rounded-full flex items-center justify-center mr-3 text-xs sm:text-sm">
                        {index + 1}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{g}</span>
                </li>
                ))}
            </ul>
        </div>
    );

}

export default dynamic (() => Promise.resolve(RecentGenres), {ssr: false})
