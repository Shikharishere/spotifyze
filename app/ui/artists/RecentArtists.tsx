"use client"; 

import React from "react";
import Image from "next/image";
import { fetchRecentArtists } from "@/app/lib/fetchData";
import { Artist } from "@/app/lib/types";


export default function RecentArtists() {
    const [recentlyLikedArtists, setRecentlyLikedArtists] = React.useState([] as Artist[]);

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await fetchRecentArtists();
        if(data) {
            setRecentlyLikedArtists(data);
        }
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recently Liked Artists</h2>
            <ul className="space-y-4">
                {recentlyLikedArtists.map((artist, index) => (
                    <li onClick={() => {
                        window.open(artist.external_urls.spotify, "_blank");
                    }} key={index} className="flex items-center gap-4 p-2 hover:cursor-pointer hover:bg-gray-100 rounded transition-colors">
                        {artist.images.length > 0 ? (
                            <Image
                                src={artist.images[0].url} 
                                alt={artist.name}
                                width={50} 
                                height={50} 
                                className="rounded-full"
                            /> ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            )
                        }
                        <span className="font-medium text-sm sm:text-base">{artist.name}</span>
                    </li>
                ))}
            </ul>
    </div>
    );
}