"use client"; 

import { fetchTopArtists } from '@/app/lib/fetchData';
import { Artist } from '@/app/lib/types';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
);

export default function FollowerSpectrum() {
    const [data, setData] = React.useState([] as Artist[]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetchTopArtists("long_term", "5");
        if(res) {
            setData(res.items);
        }
    }
    
    const followerSpectrumData = {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label : 'Followers',
                data: data.map((d) => d.followers.total),
                backgroundColor: 'rgba(29, 185, 84, 0.6)',
                borderColor: 'rgba(29, 185, 84, 1)',
                borderWidth: 1,
            }, 
        ],
    }

    const followerSpectrumOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    boxWidth: 20,
                    font: {
                        size: 10
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display : true,
                    text: 'Number of Followers',
                    font: {
                        size: 8
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
                    display : true,
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
            }
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Artist Followers Spectrum</h2>
          <div className="h-64 sm:h-80">
            <Bar data={followerSpectrumData} options={followerSpectrumOptions} />
          </div>
        </div>
    );
}