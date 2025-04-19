import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { useDashboard } from '../context/DashboardContext';

export const ChartSection: React.FC = () => {
  const { 
    projectsByState, 
    projectsByRoofType, 
    energySavingsByRoofType, 
    projectsByMonth 
  } = useDashboard();
  
  const [activeChart, setActiveChart] = useState('monthly');
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  const chartTabs = [
    { id: 'monthly', label: 'Monthly Trends' },
    { id: 'state', label: 'Projects by State' },
    { id: 'roofType', label: 'Projects by Roof Type' },
    { id: 'energy', label: 'Energy Savings' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {chartTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                  ${activeChart === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 h-96">
          {activeChart === 'monthly' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectsByMonth}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(tick) => tick.split(' ')[0]}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} projects`, 'Projects']}
                  labelFormatter={(label) => label}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Projects" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorProjects)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          
          {activeChart === 'state' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectsByState.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} projects`, 'Projects']}
                />
                <Legend />
                <Bar dataKey="count" name="Projects" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeChart === 'roofType' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectsByRoofType}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectsByRoofType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${value} projects`, props.payload.type]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          
          {activeChart === 'energy' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energySavingsByRoofType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} kWh`, 'Energy Savings']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgSavings" 
                  name="Avg. Energy Savings (kWh)" 
                  stroke="#8884d8" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing States</h3>
          <div className="overflow-hidden">
            <div className="min-w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Size (sq ft)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectsByState.slice(0, 5).map((item, index) => (
                    <tr key={item.state} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.avgSize.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Roof Type Performance</h3>
          <div className="overflow-hidden">
            <div className="min-w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Energy Savings (kWh)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectsByRoofType.map((item, index) => (
                    <tr key={item.type} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.totalSavings.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};