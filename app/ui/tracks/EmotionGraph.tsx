import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, ChartOptions, ChartData, Legend, Tooltip } from "chart.js";

Chart.register(Tooltip, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarProps {
  labels: string[];
  data: number[];
  label: string;
}


export function EmotionGraph ({labels, data, label} : BarProps) {
    
    const chartData: ChartData<'bar'> = {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: 'rgba(77,62,92,1)', // Spotify green color with opacity
            borderColor: 'rgba(30, 215, 96, 1)',      // Border color of the bars
            borderWidth: 1,
          }
        ]
    };
    const chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          display: true, // Show legend
          position: 'top', // Position of the legend
        },
      },
      scales: {
        x: {
          beginAtZero: true, // Start X-axis at zero
        },
        y: {
          beginAtZero: true, // Start Y-axis at zero
        },
      },
    };

  return (
    <div className="border-2 p-6 border-green-400 shadow-md">
         <Bar data={chartData} options={chartOptions} />
    </div>
  );
}