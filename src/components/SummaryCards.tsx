import React from 'react';
import { TrendingUp, TrendingDown, Maximize2, Thermometer, Calendar, Ruler } from 'lucide-react';

interface SummaryCardsProps {
  totalProjects: number;
  averageRoofSize: number;
  totalEnergySavings: number;
  monthlyTrend: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalProjects,
  averageRoofSize,
  totalEnergySavings,
  monthlyTrend,
}) => {
  const isPositiveTrend = parseFloat(monthlyTrend) >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Projects
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalProjects.toLocaleString()}
                  </div>
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    isPositiveTrend ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveTrend ? (
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                    )}
                    <span className="ml-1">{monthlyTrend}%</span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Average Roof Size
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {averageRoofSize.toLocaleString()} sq ft
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <Thermometer className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Energy Savings
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalEnergySavings.toLocaleString()} kWh
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
              <Maximize2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completion Rate
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    97.3%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};