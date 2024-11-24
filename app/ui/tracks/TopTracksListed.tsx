"use client";

import React from 'react';
import { TopTracks, Track, TrackData } from '@/app/lib/types';
import { cleanSongTitle } from '@/app/lib/utils';
import TimeRangeButton from '../analysis/timerangebutton';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { fetchTopTracks } from '@/app/lib/fetchData';


export default function TopTracksListed() {
  const [timeRange, setTimeRange] = React.useState<string>('medium_term');
  const [topTracks, setTopTracks] = React.useState<TopTracks>();

  React.useEffect(() => {
        getTopTracks();
    }, [timeRange])

  async function getTopTracks() {
      const data = await fetchTopTracks(timeRange, "5");
      if(data) {
        setTopTracks(data);
      }
    }
  

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Top 5 Tracks</h2>
        <div className="flex space-x-2">
          <TimeRangeButton range="short_term" current={timeRange} onClick={() => setTimeRange('short_term')} />
          <TimeRangeButton range="medium_term" current={timeRange} onClick={() => setTimeRange('medium_term')} />
          <TimeRangeButton range="long_term" current={timeRange} onClick={() => setTimeRange('long_term')} />
        </div>
      </div>
      <div>
        {topTracks ? (
          <ul className="space-y-4">
            {topTracks?.items?.map((track: Track, index: number) => (
              <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1DB954] text-white rounded-full flex items-center justify-center mr-3 text-xs sm:text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <Link href={track.external_urls.spotify}>
                      <p className="font-medium text-sm sm:text-base">{cleanSongTitle(track.name)}</p>
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-600">{track.artists[0].name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-green-500" size={36} />
          </div>          
        )}
      </div>
      
    </div>
  );
}
