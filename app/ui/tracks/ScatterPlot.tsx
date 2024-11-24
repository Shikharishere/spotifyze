"use client";

import React, { useState} from 'react'
import TimeRangeButton from '../../ui/analysis/timerangebutton';
import { Scatter } from 'react-chartjs-2';
import { AudioFeatures } from '@/app/lib/types';
import { fetchAudioFeaturesForTopTracks } from '@/app/lib/fetchData';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
)


export default function ScatterPlot() {
    const [timeRange, setTimeRange] = useState<string>('medium_term');
    const [valenceData, setValenceData] = useState([] as AudioFeatures[]);

    React.useEffect(() => {
        async function fetchData() {
            const data = await fetchAudioFeaturesForTopTracks(timeRange, "20");
            console.log(data);
            if(data) {
                setValenceData(data);
                console.log(data);
            }
        }
        fetchData();
    }, [timeRange]);

    console.log(valenceData);


    const scatterData = {
        datasets: [
            {
                label: 'Valence vs Energy',
                data: valenceData.map((track: AudioFeatures) => ({
                    x: track.valence,
                    y: track.energy,
                })),
                backgroundColor: '#1DB954',
            },
        ],
    }

    const scatterOptions = {
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
            text: 'Valence vs Energy for Top 50 Songs',
            font: {
            size: 14
            }
        },
        },
        scales: {
        y: {
            beginAtZero: true,
            max: 1,
            title: {
            display: true,
            text: 'Energy',
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
            beginAtZero: true,
            max: 1,
            title: {
            display: true,
            text: 'Valence',
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
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">Valence vs Energy for Top 50 Songs</h2>
              <div className="flex space-x-2">
                <TimeRangeButton range="short_term" current={timeRange} onClick={() => setTimeRange('short_term')} />
                <TimeRangeButton range="medium_term" current={timeRange} onClick={() => setTimeRange('medium_term')} />
                <TimeRangeButton range="long_term" current={timeRange} onClick={() => setTimeRange('long_term')} />
              </div>
            </div>
            <div className="h-64 sm:h-96">
              <Scatter data={scatterData} options={scatterOptions} />
            </div>
        </div>
    )
}