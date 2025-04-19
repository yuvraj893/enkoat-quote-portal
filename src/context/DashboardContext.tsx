import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';
import { ProjectData, FiltersType, ChartData } from '../types';
import { format, isAfter, isBefore, parse } from 'date-fns';
import { generatePDF } from '../utils/pdfExport';

interface DashboardContextType {
  filteredData: ProjectData[];
  filters: FiltersType;
  updateFilters: (filters: Partial<FiltersType>) => void;
  exportData: () => void;
  totalProjects: number;
  averageRoofSize: number;
  totalEnergySavings: number;
  projectsByState: ChartData[];
  projectsByRoofType: ChartData[];
  energySavingsByRoofType: ChartData[];
  projectsByMonth: ChartData[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data] = useState<ProjectData[]>(mockData);
  const [filteredData, setFilteredData] = useState<ProjectData[]>(mockData);
  const [filters, setFilters] = useState<FiltersType>({
    startDate: null,
    endDate: null,
    state: null,
    roofType: null,
  });

  // Derived metrics
  const totalProjects = filteredData.length;
  const averageRoofSize = Math.round(
    filteredData.reduce((sum, project) => sum + project.roofSize, 0) / totalProjects
  );
  const totalEnergySavings = filteredData.reduce(
    (sum, project) => sum + project.energySavings,
    0
  );

  // Charts data
  const projectsByState = Object.entries(
    filteredData.reduce((acc, project) => {
      if (!acc[project.state]) {
        acc[project.state] = { count: 0, totalSize: 0 };
      }
      acc[project.state].count += 1;
      acc[project.state].totalSize += project.roofSize;
      return acc;
    }, {} as Record<string, { count: number; totalSize: number }>)
  )
    .map(([state, { count, totalSize }]) => ({
      state,
      count,
      avgSize: Math.round(totalSize / count),
    }))
    .sort((a, b) => b.count - a.count);

  const projectsByRoofType = Object.entries(
    filteredData.reduce((acc, project) => {
      if (!acc[project.roofType]) {
        acc[project.roofType] = { count: 0, totalSavings: 0 };
      }
      acc[project.roofType].count += 1;
      acc[project.roofType].totalSavings += project.energySavings;
      return acc;
    }, {} as Record<string, { count: number; totalSavings: number }>)
  ).map(([type, { count, totalSavings }]) => ({
    type,
    count,
    totalSavings,
  }));

  const energySavingsByRoofType = projectsByRoofType.map(({ type, count, totalSavings }) => ({
    type,
    avgSavings: Math.round(totalSavings / count),
  }));

  const projectsByMonth = Object.entries(
    filteredData.reduce((acc, project) => {
      const month = format(new Date(project.projectDate), 'MMM yyyy');
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([month, count]) => ({
      month,
      count,
    }))
    .sort((a, b) => {
      const dateA = parse(a.month, 'MMM yyyy', new Date());
      const dateB = parse(b.month, 'MMM yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    });

  // Filter data based on current filters
  useEffect(() => {
    let result = data;

    if (filters.startDate) {
      result = result.filter((project) =>
        isAfter(new Date(project.projectDate), filters.startDate!)
      );
    }

    if (filters.endDate) {
      result = result.filter((project) =>
        isBefore(new Date(project.projectDate), filters.endDate!)
      );
    }

    if (filters.state) {
      result = result.filter((project) => project.state === filters.state);
    }

    if (filters.roofType) {
      result = result.filter((project) => project.roofType === filters.roofType);
    }

    setFilteredData(result);
  }, [data, filters]);

  // Update filters
  const updateFilters = (newFilters: Partial<FiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Export data as PDF
  const exportData = () => {
    generatePDF({
      filteredData,
      projectsByState,
      projectsByRoofType,
      energySavingsByRoofType,
      projectsByMonth,
      totalProjects,
      averageRoofSize,
      totalEnergySavings,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        filteredData,
        filters,
        updateFilters,
        exportData,
        totalProjects,
        averageRoofSize,
        totalEnergySavings,
        projectsByState,
        projectsByRoofType,
        energySavingsByRoofType,
        projectsByMonth,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};