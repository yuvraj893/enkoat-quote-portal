import { v4 as uuidv4 } from 'uuid';
import { ROOF_TYPES, STATES, CITIES_BY_STATE } from './constants';
import { ProjectData } from '../types';
import { subDays, format } from 'date-fns';

// Helper function to get random item from array
const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Helper function to get random number in range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate contractor names
const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jennifer', 'William', 'Elizabeth', 'Richard', 'Linda', 'Joseph', 'Barbara', 'Thomas', 'Susan'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];

// Generate company names
const COMPANY_PREFIXES = ['Advanced', 'Premier', 'Elite', 'Superior', 'Quality', 'Professional', 'Reliable', 'Precision', 'Innovative', 'Modern', 'Classic', 'Dynamic', 'Ace', 'Expert', 'Master'];
const COMPANY_SUFFIXES = ['Roofing', 'Construction', 'Builders', 'Contractors', 'Solutions', 'Services', 'Systems', 'Installations', 'Specialists', 'Experts', 'Partners', 'Associates', 'Professionals', 'Group', 'Team'];

// Generate contractor and company names
const generateContractorName = (): string => {
  return `${getRandomItem(FIRST_NAMES)} ${getRandomItem(LAST_NAMES)}`;
};

const generateCompanyName = (): string => {
  return `${getRandomItem(COMPANY_PREFIXES)} ${getRandomItem(COMPANY_SUFFIXES)}`;
};

// Generate random energy savings based on roof size and type
const calculateEnergySavings = (roofSize: number, roofType: string): number => {
  const baseEfficiency = {
    'Metal': 25,
    'TPO': 22,
    'Foam': 30,
    'Shingle': 15,
    'Tile': 18,
    'EPDM': 20
  };
  
  const efficiency = baseEfficiency[roofType as keyof typeof baseEfficiency] || 20;
  const baseSavings = roofSize * efficiency / 10;
  const randomFactor = 0.8 + (Math.random() * 0.4); // Random factor between 0.8 and 1.2
  
  return Math.round(baseSavings * randomFactor);
};

// Generate 1000 mock projects
export const generateMockData = (count: number = 1000): ProjectData[] => {
  const data: ProjectData[] = [];
  
  // Get southwest states for solar-heavy focus
  const southwestStates = ['Arizona', 'California', 'Colorado', 'Nevada', 'New Mexico', 'Texas', 'Utah'];
  
  // Date range for projects (past 2 years)
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 2);
  
  for (let i = 0; i < count; i++) {
    // Slightly bias toward southwest states
    const state = Math.random() < 0.7 
      ? getRandomItem(southwestStates) 
      : getRandomItem(STATES);
    
    // Get city based on state or random if no cities defined
    const citiesForState = CITIES_BY_STATE[state] || ['Unknown City'];
    const city = getRandomItem(citiesForState);
    
    // Generate random date within range
    const daysToSubtract = getRandomNumber(0, 730); // Up to 2 years
    const projectDate = format(subDays(new Date(), daysToSubtract), 'yyyy-MM-dd');
    
    // Generate roofSize (most commercial roofs between 5000-50000 sq ft)
    const roofSize = getRandomNumber(5000, 50000);
    
    // Select roof type with some bias toward more efficient types in hot regions
    let roofType;
    if (southwestStates.includes(state) && Math.random() < 0.6) {
      roofType = getRandomItem(['Metal', 'TPO', 'Foam']); // More efficient in hot regions
    } else {
      roofType = getRandomItem(ROOF_TYPES);
    }
    
    // Energy savings calculation
    const energySavings = calculateEnergySavings(roofSize, roofType);
    
    // Generate project completion status
    // Older projects more likely to be completed
    const completed = daysToSubtract > 30 ? Math.random() < 0.95 : Math.random() < 0.5;
    
    data.push({
      id: uuidv4(),
      contractorName: generateContractorName(),
      company: generateCompanyName(),
      roofSize,
      roofType,
      city,
      state,
      projectDate,
      energySavings,
      completed
    });
  }
  
  return data;
};

// Generate the mock data
export const mockData: ProjectData[] = generateMockData();