import { useEffect, useState } from "react";
import { WiDaySunny, WiThermometer, WiTime3 } from "react-icons/wi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import "./App.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

const ITEMS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m"
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600 fade-in">
        Loading weather data...
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500 fade-in">
        Failed to load data.
      </div>
    );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedTime = data.hourly.time.slice(startIndex, endIndex);
  const paginatedTemps = data.hourly.temperature_2m.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.hourly.time.length / ITEMS_PER_PAGE);

  const currentTemp = data.hourly.temperature_2m[0];
  const currentTime = new Date(data.hourly.time[0]).toLocaleString();

  // Data Chart.js
  const chartData = {
    labels: paginatedTime.map((t) => new Date(t).toLocaleTimeString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: paginatedTemps,
        fill: false,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgb(37, 99, 235)",
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 fade-in">

      {/* Title */}
      <div className="flex flex-col items-center gap-2 slide-up">
        <WiDaySunny className="text-6xl text-yellow-400 drop-shadow" />
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Weather Forecast
        </h1>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between slide-up">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <WiThermometer className="text-4xl" />
            Current Temperature
          </h2>
          <p className="text-5xl font-extrabold mt-1 drop-shadow-lg">
            {currentTemp}°C
          </p>
          <p className="mt-1 opacity-80 flex items-center gap-1">
            <WiTime3 className="text-2xl" />
            {currentTime}
          </p>
        </div>
        <WiDaySunny className="text-8xl opacity-90 animate-pulse" />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl slide-up border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Temperature Chart</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 slide-up">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="py-3 px-4 font-semibold">Time</th>
              <th className="py-3 px-4 font-semibold flex items-center gap-1">
                <WiThermometer className="text-xl" /> Temperature (°C)
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedTime.map((t, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 even:bg-gray-50 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <td className="py-3 px-4 text-gray-700">
                  {new Date(t).toLocaleString()}
                </td>
                <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                  <WiThermometer className="text-blue-600 text-2xl" />
                  {paginatedTemps[i]} °C
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-transform duration-200
              ${page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              }`}
          >
            <FiChevronLeft /> Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page <span className="font-bold">{page}</span> of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-transform duration-200
              ${page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              }`}
          >
            Next <FiChevronRight />
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
