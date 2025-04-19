export interface ProjectData {
  id: string;
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: string;
  city: string;
  state: string;
  projectDate: string;
  energySavings: number;
  completed: boolean;
}

export interface FiltersType {
  startDate: Date | null;
  endDate: Date | null;
  state: string | null;
  roofType: string | null;
}

export interface ChartData {
  [key: string]: string | number;
}