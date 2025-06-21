import React from 'react';
import {
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Visit {
  name: string;
  city: string;
  country: string;
}

const visits: Visit[] = [
  { name: 'Visit of eiffel tower', city: 'Paris', country: 'France' },
  { name: 'Visit of japanese temples', city: 'Tokyo', country: 'Japan' },
  { name: 'Visit of the colysee', city: 'Roma', country: 'Italy' },
  { name: 'Visite of the playa', city: 'Rio', country: 'Brasil' },
  { name: 'Visit of LA', city: 'Los Angeles', country: 'USA' },
  { name: 'Visit of time square', city: 'New York', country: 'USA' },
  { name: 'Visite of Les champs elysée', city: 'Paris', country: 'France' },
];

const VisitTable: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f1f6ff] p-8">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-white shadow rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="flex items-center bg-white shadow px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
            <FunnelIcon className="h-5 w-5 mr-1" />
            <span>Filters</span>
          </button>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600">
          + Create a visit
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="shadow bg-gray-50 border-b border-gray-300 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-3 w-1/2">Visit name</th>
              <th className="px-6 py-3 w-1/3">Destination</th>
              <th className="px-6 py-3 w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-800">{visit.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="font-semibold">{visit.city}</div>
                  <div className="text-gray-500">{visit.country}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 flex space-x-4">
                  <button className="text-gray-500 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitTable;
