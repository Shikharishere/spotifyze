"use client";

import React, { useState, useEffect } from 'react'
import { fetchObscureGenre } from '@/app/lib/fetchData';
import { ObscureGenres } from '@/app/lib/types';
import { Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Legend,
} from 'chart.js'

ChartJS.register(
    ArcElement,
    Title,
    Legend
)
import dynamic from 'next/dynamic';


function ObscureGenre() {
    const [data, setData] = useState<ObscureGenres>();
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        fetchData();
        setIsClient(true);
    }, []);

    async function fetchData() {
        const data = await fetchObscureGenre();
        if(data) {
            setData(data);
        }
    }
        

    const obscureGenreData = {
        labels: ['Mainstream', 'Niche'],
        datasets: [
            {
                data: [data?.mainstream || 0, data?.niche || 0],
                backgroundColor: [
                'rgba(29, 185, 84, 0.6)',
                'rgba(30, 215, 96, 0.6)',
                ],
                borderColor: [
                'rgba(29, 185, 84, 1)',
                'rgba(30, 215, 96, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const pieOptions = {
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
                text: 'Obscure Genre Index',
                font: {
                size: 14
                }
            },
        },
    }

    return (
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Obscure Genre Index</h2>
          <div className="h-64 sm:h-80 p-2">
            {isClient && <Pie data={obscureGenreData} options={pieOptions} />}
          </div>
        </div>
    );
}
export default dynamic (() => Promise.resolve(ObscureGenre), {ssr: false})
