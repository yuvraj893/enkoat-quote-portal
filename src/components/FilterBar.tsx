import React from 'react';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { FiltersType } from '../types';
import { ROOF_TYPES, STATES } from '../data/constants';

interface FilterBarProps {
  filters: FiltersType;
  updateFilters: (filters: Partial<FiltersType>) => void;
  exportData: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  updateFilters,
  exportData
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFilters({ 
      [name]: value ? new Date(value) : null 
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value === 'all' ? null : value });
  };

  const resetFilters = () => {
    updateFilters({
      startDate: null,
      endDate: null,
      state: null,
      roofType: null
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-gray-500" />
          Filter Data
        </h2>
        <div className="flex mt-3 sm:mt-0 space-x-3">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset
          </button>
          <button
            type="button"
            onClick={exportData}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={filters.startDate ? filters.startDate.toISOString().slice(0, 10) : ''}
            onChange={handleDateChange}
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={filters.endDate ? filters.endDate.toISOString().slice(0, 10) : ''}
            onChange={handleDateChange}
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={filters.state || 'all'}
            onChange={handleSelectChange}
          >
            <option value="all">All States</option>
            {STATES.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">
            Roof Type
          </label>
          <select
            id="roofType"
            name="roofType"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={filters.roofType || 'all'}
            onChange={handleSelectChange}
          >
            <option value="all">All Types</option>
            {ROOF_TYPES.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};