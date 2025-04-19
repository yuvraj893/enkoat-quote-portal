import { format } from 'date-fns';
import { ProjectData, ChartData } from '../types';

interface ExportData {
  filteredData: ProjectData[];
  projectsByState: ChartData[];
  projectsByRoofType: ChartData[];
  energySavingsByRoofType: ChartData[];
  projectsByMonth: ChartData[];
  totalProjects: number;
  averageRoofSize: number;
  totalEnergySavings: number;
}

export const generatePDF = (data: ExportData) => {
  // For now, just console log the data since we removed jspdf
  console.log('Export data:', data);
  alert('Export functionality will be implemented in a future update.');
};