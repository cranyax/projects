import { useState } from 'react';
import TimeFilterButtons from './TimeFilterButtons';
import { FiChevronsLeft } from 'react-icons/fi';
import { IoMdKeypad } from 'react-icons/io';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  // Independent states for each chart
  const [selectedFilter1, setSelectedFilter1] = useState("7 Day");
  const [selectedFilter2, setSelectedFilter2] = useState("7 Day");
  const [selectedFilter3, setSelectedFilter3] = useState("7 Day");
  const [selectedFilter4, setSelectedFilter4] = useState("7 Day");

  // Dummy data for each chart
  const performanceData = [
    { name: "Jan", TotalDailyBBLS: 10 },
    { name: "Feb", TotalDailyBBLS: 30 },
    { name: "Mar", TotalDailyBBLS: 20 },
    { name: "Apr", TotalDailyBBLS: 50 },
    { name: "May", TotalDailyBBLS: 40 },
  ];

  const usageData = [
    { name: "Jan", "HP $/BBL": 30, "Coag $/BBL": 10, "Poly $/BBL": 20 },
    { name: "Feb", "HP $/BBL": 50, "Coag $/BBL": 20, "Poly $/BBL": 30 },
    { name: "Mar", "HP $/BBL": 40, "Coag $/BBL": 15, "Poly $/BBL": 25 },
    { name: "Apr", "HP $/BBL": 70, "Coag $/BBL": 30, "Poly $/BBL": 50 },
    { name: "May", "HP $/BBL": 60, "Coag $/BBL": 25, "Poly $/BBL": 40 },
  ];

  const historicalData = [
    { name: "Day 1", Total: 200, HP: 80, Coag: 260, Poly: 60 },
    { name: "Day 2", Total: 180, HP: 70, Coag: 255, Poly: 55 },
    { name: "Day 3", Total: 210, HP: 185, Coag: 265, Poly: 160 },
    { name: "Day 4", Total: 190, HP: 75, Coag: 258, Poly: 57 },
  ];
  

  return (
    <div className="flex flex-col flex-1">  
      {/* Go Back Button */}
      <div className="flex">
        <button className="flex items-center cursor-pointer gap-1 px-2 text-sm ml-3 mt-3 font-medium border rounded-xs border-gray-500 bg-white text-gray-500 hover:bg-gray-200 w-auto">
          Go back
          <FiChevronsLeft />
        </button>
      </div>

      {/* Top Section - 3 Columns */}
      <div className="flex gap-4 p-4 h-96">
        {/* Chart 1 - Performance Metrics */}
        <div className="flex-1 text-center bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold justify-center items-center flex">
            <IoMdKeypad className='border border-blue-400 rounded text-blue-400 p-auto m-1 text-xl' />
            All CLO2 Barrels Treated
          </h3>
          <div className="flex justify-center items-center mb-4">
            <TimeFilterButtons
              options={["7 Day", "14 Day", "30 Day", "60 Day", "90 Day"]}
              selectedOption={selectedFilter1}
              onSelect={setSelectedFilter1}
            />
          </div>
          <div className="bg-gray-100 h-full rounded flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45} // Rotates labels by 45 degrees
                  textAnchor="end" // Ensures text alignment
                />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  dataKey="TotalDailyBBLS"
                  name="Total Daily BBLS"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 - Data Summary */}
        <div className="flex-1 text-center bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold justify-center items-center flex">
            <IoMdKeypad className='border border-blue-400 rounded text-blue-400 p-auto m-1 text-xl' />
            All CLO2 Chemicals -$/BBL
          </h3>
          <div className="flex justify-center items-center mb-4">
            <TimeFilterButtons
              options={["7 Day", "14 Day", "30 Day", "60 Day", "90 Day"]}
              selectedOption={selectedFilter2}
              onSelect={setSelectedFilter2}
            />
          </div>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Chemicals</th>
                <th className="border border-gray-300 p-2" colSpan="2">24 Hrs</th>
                <th className="border border-gray-300 p-2" colSpan="2">7 Days</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2"></th>
                <th className="border border-gray-300 p-2">Cost</th>
                <th className="border border-gray-300 p-2">Vol -gi</th>
                <th className="border border-gray-300 p-2">Cost</th>
                <th className="border border-gray-300 p-2">Vol -gi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "HP", cost24: 120, vol24: 50, cost7: 800, vol7: 350 },
                { name: "Coag", cost24: 95, vol24: 40, cost7: 670, vol7: 290 },
                { name: "Poly", cost24: 110, vol24: 45, cost7: 750, vol7: 320 },
                { name: "Total", cost24: 325, vol24: 135, cost7: 2220, vol7: 960 },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="border border-gray-300 p-2">{row.name}</td>
                  <td className="border border-gray-300 p-2">{row.cost24}</td>
                  <td className="border border-gray-300 p-2">{row.vol24}</td>
                  <td className="border border-gray-300 p-2">{row.cost7}</td>
                  <td className="border border-gray-300 p-2">{row.vol7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart 3 - Usage Statistics */}
        <div className="flex-1 text-center bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold justify-center items-center flex">
            <IoMdKeypad className='border border-blue-400 rounded text-blue-400 p-auto m-1 text-xl' />
            All CLO2 Chemicals -$/BBL
          </h3>
          <div className="flex justify-center items-center mb-4">
            <TimeFilterButtons
              options={["7 Day", "14 Day", "30 Day", "60 Day", "90 Day"]}
              selectedOption={selectedFilter3}
              onSelect={setSelectedFilter3}
            />
          </div>
          <div className="bg-gray-100 h-full rounded flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" 
                  angle={-45} // Rotates labels by 45 degrees
                  textAnchor="end" // Ensures text alignment
                />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                
                <Area
                  type="monotone"
                  dataKey="HP $/BBL"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 5, fill: "#8884d8" }}
                />
                
                <Area
                  type="monotone"
                  dataKey="Coag $/BBL"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 5, fill: "#82ca9d" }}
                />
                
                <Area
                  type="monotone"
                  dataKey="Poly $/BBL"
                  stroke="#ff7300"
                  fill="#ff7300"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 5, fill: "#ff7300" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section - Full Width */}
      <div className="p-4 flex-1">
        <div className="bg-white rounded-lg shadow h-96 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold justify-center items-center flex">
              <IoMdKeypad className='border border-blue-400 rounded text-blue-400 p-auto m-1 text-xl' />
              All Chemicals GPTB
            </h3>
            <TimeFilterButtons
              options={["7 Day", "14 Day", "30 Day", "60 Day", "90 Day"]}
              selectedOption={selectedFilter4}
              onSelect={setSelectedFilter4}
            />
          </div>
          <div className="bg-gray-100 h-full rounded flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />

                <Area
                  type="monotone"
                  dataKey="Total"
                  stroke="#ff7300"
                  fill="#ff7300"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="HP"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="Coag"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="Poly"
                  stroke="#d32f2f"
                  fill="#d32f2f"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;