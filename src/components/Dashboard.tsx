import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SummaryCards } from './SummaryCards';
import { ChartSection } from './ChartSection';
import { FilterBar } from './FilterBar';
import { useDashboard } from '../context/DashboardContext';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { 
    filteredData, 
    filters, 
    updateFilters, 
    exportData,
    totalProjects,
    averageRoofSize,
    totalEnergySavings,
    projectsByMonth
  } = useDashboard();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-auto">
        <Header openSidebar={() => setSidebarOpen(true)} />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Performance Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Data updated as of {format(new Date(), 'MMMM dd, yyyy')}
            </p>
          </div>
          
          <FilterBar 
            filters={filters} 
            updateFilters={updateFilters} 
            exportData={exportData}
          />
          
          <SummaryCards 
            totalProjects={totalProjects}
            averageRoofSize={averageRoofSize}
            totalEnergySavings={totalEnergySavings}
            monthlyTrend={projectsByMonth.length > 0 ? 
              ((projectsByMonth[projectsByMonth.length - 1].count - 
                projectsByMonth[projectsByMonth.length - 2].count) / 
                projectsByMonth[projectsByMonth.length - 2].count * 100).toFixed(1) : '0'}
          />
          
          <ChartSection />
        </main>
      </div>
    </div>
  );
};