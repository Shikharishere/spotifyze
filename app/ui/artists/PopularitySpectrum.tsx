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
import { max } from 'd3';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
);


export default function PopularitySpectrum() {
    const [data, setData] = React.useState([] as Artist[]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetchTopArtists("long_term", "50");
        if(res) { 
            setData(res.items);
        }
    }


    const popularitySpectrumData = {
        labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
        datasets: [
            {
                label : 'Number of Artists',
                data: [
                    data.filter((d) => d.popularity >= 0 && d.popularity <= 20).length,
                    data.filter((d) => d.popularity >= 21 && d.popularity <= 40).length,
                    data.filter((d) => d.popularity >= 41 && d.popularity <= 60).length,
                    data.filter((d) => d.popularity >= 61 && d.popularity <= 80).length,
                    data.filter((d) => d.popularity >= 81 && d.popularity <= 100).length,
                ],
                backgroundColor: 'rgba(29, 185, 84, 0.6)',
                borderColor: 'rgba(29, 185, 84, 1)',
                borderWidth: 1,
            }, 
        ],
    }


    const popularitySpectrumOptions = {
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
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 50,
                title: {
                    display : true,
                    text: 'Number of Artists',
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
        },
    }
   

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Artist Popularity Spectrum</h2>
          <div className="h-64 sm:h-80">
            <Bar data={popularitySpectrumData} options={popularitySpectrumOptions} />
          </div>
        </div>
    );
}