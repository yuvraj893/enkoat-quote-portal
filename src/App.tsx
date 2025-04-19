import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { QuoteForm } from './components/QuoteForm';
import { ContractorList } from './components/ContractorList';
import { DashboardProvider } from './context/DashboardContext';
import { useDashboard } from './context/DashboardContext';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'quote' | 'contractors'>('dashboard');

  return (
    <DashboardProvider>
      <AppContent currentView={currentView} setCurrentView={setCurrentView} />
    </DashboardProvider>
  );
}

interface AppContentProps {
  currentView: 'dashboard' | 'quote' | 'contractors';
  setCurrentView: (view: 'dashboard' | 'quote' | 'contractors') => void;
}

const AppContent: React.FC<AppContentProps> = ({ currentView, setCurrentView }) => {
  const { filteredData } = useDashboard();

  const handleQuoteSubmit = (data: any) => {
    console.log('Quote submitted:', data);
    alert('Quote submitted successfully!');
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentView === 'dashboard'
                    ? 'border-green-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('quote')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentView === 'quote'
                    ? 'border-green-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Submit Quote
              </button>
              <button
                onClick={() => setCurrentView('contractors')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentView === 'contractors'
                    ? 'border-green-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Contractors
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'quote' && <QuoteForm onSubmit={handleQuoteSubmit} />}
        {currentView === 'contractors' && <ContractorList projects={filteredData} />}
      </main>
    </div>
  );
}

export default App;