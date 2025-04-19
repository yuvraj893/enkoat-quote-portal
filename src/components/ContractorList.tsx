import React from 'react';
import { ProjectData } from '../types';
import { format } from 'date-fns';

interface ContractorListProps {
  projects: ProjectData[];
}

export const ContractorList: React.FC<ContractorListProps> = ({ projects }) => {
  const uniqueContractors = Array.from(
    new Set(projects.map(project => project.contractorName))
  ).map(contractorName => {
    const contractorProjects = projects.filter(
      project => project.contractorName === contractorName
    );
    const totalProjects = contractorProjects.length;
    const totalRoofSize = contractorProjects.reduce(
      (sum, project) => sum + project.roofSize,
      0
    );
    const latestProject = contractorProjects.reduce((latest, project) =>
      new Date(project.projectDate) > new Date(latest.projectDate) ? project : latest
    );

    return {
      name: contractorName,
      company: contractorProjects[0].company,
      totalProjects,
      totalRoofSize,
      latestProject: latestProject.projectDate,
    };
  });

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Contractors</h2>
        <p className="mt-1 text-sm text-gray-500">
          List of all contractors and their project statistics
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Projects
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Roof Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latest Project
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uniqueContractors.map((contractor, index) => (
                <tr key={contractor.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contractor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contractor.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contractor.totalProjects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contractor.totalRoofSize.toLocaleString()} sq ft
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(contractor.latestProject), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};