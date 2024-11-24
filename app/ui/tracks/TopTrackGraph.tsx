"use client"; 

import React, { useEffect, useState} from 'react'
import TimeRangeButton from '../../ui/analysis/timerangebutton';
import {
    Chart as ChartJS,
    LineController,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { cleanSongTitle } from '@/app/lib/utils';
import { Track, TopTracks } from '@/app/lib/types';
import { fetchTopTracks } from '@/app/lib/fetchData';
import { Loader2 } from 'lucide-react';

ChartJS.register(
    LineController,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);


export default function TopTrackGraph() {
    const [timeRange, setTimeRange] = useState('medium_term')
    const [topTracks, setTopTracks] = useState<TopTracks>();

    useEffect(() => {
        async function getTopTracks() {
            const data = await fetchTopTracks(timeRange, "10");
            if(data) {
                setTopTracks(data);
            }
        }
        getTopTracks();
    }, [timeRange])

    

    const chartData = {
        labels: topTracks?.items?.map((track: Track) => cleanSongTitle(track.name)),
        datasets: [
            {
                label: 'Popularity',
                data: topTracks?.items?.map((track: Track) => track.popularity),
                fill: false,
                backgroundColor: '#1DB954',
                borderColor: '#1DB954',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'top' as const,
            labels: {
            boxWidth: 10,
            font: {
                size: 10
            }
            }
        },
        title: {
            display: true,
            text: 'Top 10 Songs Popularity',
            font: {
            size: 14
            }
        },
        },
        scales: {
        y: {
            beginAtZero: true,
            max: 100,
            title: {
            display: true,
            text: 'Popularity',
            font: {
                size: 10
            }
            },
            ticks: {
            font: {
                size: 8
            }
            }
        },
        x: {
            title: {
            display: true,
            text: 'Songs',
            font: {
                size: 10
            }
            },
            ticks: {
            font: {
                size: 8
            }
            }
        },
        },
    }

    return (
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">Top 10 Tracks Popularity</h2>
                <div className="flex space-x-2">
                    <TimeRangeButton range="short_term" current={timeRange} onClick={() => setTimeRange('short_term')} />
                    <TimeRangeButton range="medium_term" current={timeRange} onClick={() => setTimeRange('medium_term')} />
                    <TimeRangeButton range="long_term" current={timeRange} onClick={() => setTimeRange('long_term')} />
                </div>
            </div>
            <div className="h-64 sm:h-80">
                {topTracks ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-green-500" size={36} />
                    </div>
                )}
            </div>
        </div>
    );
}