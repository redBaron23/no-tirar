"use client";

import React, { useState, useEffect } from "react";
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
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface Option {
  label: string;
  value: string;
}

interface ChartDataPoint {
  labels: string[];
  income: number[];
  expenses: number[];
}

interface DateData {
  total: number;
  upDown: number;
  data: ChartDataPoint;
}

interface ApiResponse {
  dates: {
    [key: string]: DateData;
  };
}

const LineChart = () => {
  const [date, setDate] = useState<string>("today");
  const [data, setData] = useState<ApiResponse["dates"] | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const options: Option[] = [
    { label: "Hoy", value: "today" },
    { label: "Últimos 7 días", value: "7days" },
    { label: "Últimos 30 días", value: "30days" },
    { label: "Últimos 6 meses", value: "6months" },
    { label: "Este año", value: "year" },
  ];

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json",
    )
      .then((res) => res.json())
      .then((res: ApiResponse) => {
        setData(res.dates);
      });
  }, []);

  const selectOption = (value: string) => {
    setDate(value);
    setShowDropdown(false);
  };

  const commaFormatter = (num: number): string => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            if (typeof value === "number") {
              return value > 1000
                ? value < 1000000
                  ? value / 1000 + "K"
                  : value / 1000000 + "M"
                : value;
            }
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // This line hides the legend
      },
    },
  };

  const chartData: ChartData<"line"> | null = data
    ? {
        labels: data[date].data.labels,
        datasets: [
          {
            label: "Ventas",
            backgroundColor: "rgba(102, 126, 234, 0.25)",
            borderColor: "rgba(102, 126, 234, 1)",
            pointBackgroundColor: "rgba(102, 126, 234, 1)",
            data: data[date].data.income,
            tension: 0.5,
          },
        ],
      }
    : null;

  if (!data) return <div>Cargando...</div>;

  return (
    <div className="flex w-full flex-col gap-4 rounded p-5 text-gray-500 shadow-xl">
      <div className="flex justify-between">
        <div className="grid grid-cols-3 items-center gap-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold leading-tight">Pedidos</h3>
            <h4 className="text-2xl font-semibold leading-tight lg:text-3xl">
              ${commaFormatter(data[date].total)}
            </h4>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold leading-tight">Ventas</h3>
            <h4 className="text-2xl font-semibold leading-tight lg:text-3xl">
              ${commaFormatter(data[date].total)}
            </h4>
          </div>
          <div className="flex flex-col">
            <span
              className={`inline-block ${
                data[date].upDown < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {data[date].upDown < 0 ? "▼" : "▲"} {Math.abs(data[date].upDown)}%
            </span>
          </div>
        </div>
        {/* <div>
          <button
            className="h-6 text-xs hover:text-gray-300 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {options.find((option) => option.value === date)?.label}
            <i className="mdi mdi-chevron-down ml-1"></i>
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-auto z-30 -mr-3 mt-1 w-32 min-w-full rounded bg-gray-700 text-sm shadow-lg">
              <span className="absolute right-0 top-0 -mt-1 mr-3 h-3 w-3 rotate-45 transform bg-gray-700"></span>
              <div className="relative z-10 w-full rounded bg-gray-700 py-1">
                <ul className="list-reset text-xs">
                  {options.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer px-4 py-2 transition-colors duration-100 hover:bg-gray-600 hover:text-white ${item.value === date ? "text-white" : ""}`}
                      onClick={() => selectOption(item.value)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div> */}
      </div>

      <div className="h-64 w-full">
        {chartData && <Line options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
};

export default LineChart;
