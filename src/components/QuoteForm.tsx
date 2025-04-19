import React, { useState } from 'react';
import { ROOF_TYPES, STATES, CITIES_BY_STATE } from '../data/constants';

interface QuoteFormProps {
  onSubmit: (data: {
    contractorName: string;
    company: string;
    roofSize: number;
    roofType: string;
    city: string;
    state: string;
    projectDate: string;
  }) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    contractorName: '',
    company: '',
    roofSize: '',
    roofType: '',
    state: '',
    city: '',
    projectDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}), // Reset city when state changes
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.contractorName.trim()) newErrors.contractorName = 'Contractor name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.roofSize) newErrors.roofSize = 'Roof size is required';
    if (Number(formData.roofSize) <= 0) newErrors.roofSize = 'Roof size must be greater than 0';
    if (!formData.roofType) newErrors.roofType = 'Roof type is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.projectDate) newErrors.projectDate = 'Project date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        roofSize: Number(formData.roofSize),
      });
      
      // Reset form
      setFormData({
        contractorName: '',
        company: '',
        roofSize: '',
        roofType: '',
        state: '',
        city: '',
        projectDate: '',
      });
    }
  };

  const availableCities = formData.state ? CITIES_BY_STATE[formData.state] || [] : [];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submit New Quote</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contractorName" className="block text-sm font-medium text-gray-700">
              Contractor Name
            </label>
            <input
              type="text"
              id="contractorName"
              name="contractorName"
              value={formData.contractorName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.contractorName 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.contractorName && (
              <p className="mt-1 text-sm text-red-600">{errors.contractorName}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.company 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          <div>
            <label htmlFor="roofSize" className="block text-sm font-medium text-gray-700">
              Roof Size (sq ft)
            </label>
            <input
              type="number"
              id="roofSize"
              name="roofSize"
              value={formData.roofSize}
              onChange={handleChange}
              min="1"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.roofSize 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.roofSize && (
              <p className="mt-1 text-sm text-red-600">{errors.roofSize}</p>
            )}
          </div>

          <div>
            <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">
              Roof Type
            </label>
            <select
              id="roofType"
              name="roofType"
              value={formData.roofType}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.roofType 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            >
              <option value="">Select Roof Type</option>
              {ROOF_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.roofType && (
              <p className="mt-1 text-sm text-red-600">{errors.roofType}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.state 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            >
              <option value="">Select State</option>
              {Object.keys(CITIES_BY_STATE).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.city 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            >
              <option value="">Select City</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="projectDate" className="block text-sm font-medium text-gray-700">
              Project Date
            </label>
            <input
              type="date"
              id="projectDate"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.projectDate 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.projectDate && (
              <p className="mt-1 text-sm text-red-600">{errors.projectDate}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Quote
          </button>
        </div>
      </form>
    </div>
  );
};