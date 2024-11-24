"use client"; 

import React from "react";
import TimeRangeButton from "../analysis/timerangebutton";
import { Bar } from "react-chartjs-2";
import { TopArtists } from "@/app/lib/types";
import { fetchTopArtists } from "@/app/lib/fetchData";

export default function ArtistsPopularityGraph() {
  const [timeRange, setTimeRange] = React.useState("medium_term");
  const [topArtists, setTopArtists] = React.useState({} as TopArtists);

  const topArtistsChartData = {
    labels: topArtists.items?.map((artist) => artist.name),
    datasets: [
      {
        label: 'Artist Popularity',
        data: topArtists.items?.map((artist) => artist.popularity),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1,
      },
    ],
  }

  React.useEffect(() => {
    fetchData();
  }, [timeRange]);

  async function fetchData() {
    const data = await fetchTopArtists(timeRange, "10");
    if(data) {
      setTopArtists(data);
    }
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
        text: 'Top 10 Artists Popularity',
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
      <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">Top 10 Artists Popularity</h2>
          <div className="flex space-x-2">
            <TimeRangeButton range="short_term" current={timeRange} onClick={() => setTimeRange('short_term')} />
            <TimeRangeButton range="medium_term" current={timeRange} onClick={() => setTimeRange('medium_term')} />
            <TimeRangeButton range="long_term" current={timeRange} onClick={() => setTimeRange('long_term')} />
          </div>
        </div>
        <div className="h-64 sm:h-80">
          <Bar data={topArtistsChartData} options={chartOptions} />
        </div>
      </div> 
  );
}