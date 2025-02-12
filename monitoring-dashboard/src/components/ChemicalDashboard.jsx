import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import { Menu } from 'lucide-react';

const barrelData = [
  { date: '08/06/2024', value: 37000 },
  { date: '08/08/2024', value: 34000 },
  { date: '08/10/2024', value: 36000 },
  { date: '08/12/2024', value: 39000 },
  { date: '08/14/2024', value: 40000 },
  { date: '08/16/2024', value: 38000 },
  { date: '08/18/2024', value: 37500 },
  { date: '08/20/2024', value: 38500 }
];

const chemicalData = [
  { date: '08/06/2024', HP: 5.5, Poly: 2.5, Coag: 0, Total: 8 },
  { date: '08/08/2024', HP: 3.5, Poly: 4.5, Coag: 0, Total: 8 },
  { date: '08/10/2024', HP: 2.0, Poly: 5.0, Coag: 0, Total: 7 },
  { date: '08/12/2024', HP: 3.0, Poly: 6.0, Coag: 0, Total: 9 },
  { date: '08/14/2024', HP: 15.0, Poly: 8.0, Coag: 0, Total: 23 },
  { date: '08/16/2024', HP: 12.0, Poly: 6.0, Coag: 0, Total: 18 },
  { date: '08/18/2024', HP: 4.0, Poly: 3.0, Coag: 0, Total: 7 },
  { date: '08/20/2024', HP: 5.0, Poly: 4.0, Coag: 0, Total: 9 }
];

const ChemicalDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-gray-100">
        <div className="p-4 flex items-center">
          <div className="text-xl font-semibold">Orion RDV</div>
          <Menu className="ml-auto" />
        </div>
        
        <nav className="mt-4">
          {[
            'Home',
            'Alerts',
            'Summary Data',
            'Analytics',
            'Reports',
            'Operations',
            'Financial',
            'Sensor Telemetry',
            'Data Management',
            'Asset Management',
            'Device Management',
            'Authorized Key',
            'Subscription',
            'Administration',
            'Job Management'
          ].map((item) => (
            <div
              key={item}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded border"
              />
            </div>
            <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded">
              No Alerts 0
            </button>
          </div>

          {/* Back Button */}
          <button className="mb-4 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">
            Go back
          </button>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Barrels Treated Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All CLO2 Barrels Treated</h2>
                <div className="flex gap-2">
                  {['7 Day', '14 Day', '30 Day', '60 Day', '90 Day'].map((period) => (
                    <button
                      key={period}
                      className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <LineChart width={600} height={300} data={barrelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot />
              </LineChart>
            </div>

            {/* Chemicals Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All CLO2 Chemicals -$/BBL</h2>
                <div className="flex gap-2">
                  {['7 Day', '14 Day', '30 Day', '60 Day', '90 Day'].map((period) => (
                    <button
                      key={period}
                      className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Chemicals</th>
                      <th className="px-4 py-2 text-left">24 Hrs</th>
                      <th className="px-4 py-2 text-left">7 Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">HP</td>
                      <td className="px-4 py-2">$0.639</td>
                      <td className="px-4 py-2">$2.427</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Coag</td>
                      <td className="px-4 py-2">$0.00</td>
                      <td className="px-4 py-2">$0.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Poly</td>
                      <td className="px-4 py-2">$0.064</td>
                      <td className="px-4 py-2">$0.297</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* GPTB Chart */}
            <div className="bg-white p-4 rounded-lg shadow col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All Chemicals GPTB</h2>
                <div className="flex gap-2">
                  {['7 Day', '14 Day', '30 Day', '60 Day', '90 Day'].map((period) => (
                    <button
                      key={period}
                      className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <AreaChart width={1200} height={300} data={chemicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="HP" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Poly" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="Coag" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemicalDashboard;