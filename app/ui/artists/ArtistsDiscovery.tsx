"use client"; 

import { discoveryVsLoaylty } from "@/app/lib/types";
import React from "react";
import { discoveryVsLoayltyScore } from "@/app/lib/fetchData";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, 
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ArtistsDiscovery() {
    const [artistDiscoveryData, setArtistDiscoveryData] = React.useState([] as discoveryVsLoaylty[]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await discoveryVsLoayltyScore();
        if(data) {
            setArtistDiscoveryData(data);
        }
    }


    const discoveryChartData = {
        labels: artistDiscoveryData.map(d => d.artist.name),
        datasets: [
            {
                label: 'Artist Discovery',
                data: artistDiscoveryData.map(d => d.discovery),
                backgroundColor: 'rgba(29, 185, 84, 0.6)',
                borderColor: 'rgba(29, 185, 84, 1)',
                borderWidth: 1,
            },
            {
                label: 'Artist Loyalty',
                data: artistDiscoveryData.map(d => d.loyalty),
                backgroundColor: 'rgba(185, 29, 29, 0.6)',
                borderColor: 'rgba(185, 29, 29, 1)',
                borderWidth: 1,
            },
        ]
    }

    const discoveryChartOptions = {
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
                text: 'Artist Discovery vs. Loyalty',
                    font: {
                        size: 14
                    }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                display: true,
                text: 'Rank',
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
                text: 'Artists',
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
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Artist Discovery vs. Loyalty</h2>
            <div className="h-64 sm:h-96">
              <Line data={discoveryChartData} options={discoveryChartOptions} />
            </div>
        </div>
    );
}