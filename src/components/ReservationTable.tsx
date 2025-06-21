import React from 'react';
import {
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import {NavLink} from "react-router-dom";

interface Reservation {
  name: string;
  city: string;
  country: string;
  maxVisitor: number;
  startDate: string;
}

const reservations: Reservation[] = [
  { name: 'Visit of effeil tower', city: 'Paris', country: 'France', maxVisitor: 80, startDate: '22 Jan 2022' },
  { name: 'Visit of japanese temples', city: 'Tokyo', country: 'Japan', maxVisitor: 30, startDate: '20 Jan 2022' },
  { name: 'Visit of the colysee', city: 'Roma', country: 'Italy', maxVisitor: 38, startDate: '24 Jan 2022' },
  { name: 'Visite of the playa', city: 'Rio', country: 'Brasil', maxVisitor: 78, startDate: '26 Jan 2022' },
  { name: 'Visit of LA', city: 'Los Angeles', country: 'USA', maxVisitor: 90, startDate: '18 Jan 2022' },
  { name: 'Visit of time square', city: 'New York', country: 'USA', maxVisitor: 23, startDate: '28 Jan 2022' },
  { name: 'Visite of Les champs elysée', city: 'Paris', country: 'France', maxVisitor: 12, startDate: '16 Jan 2022' },
];

const ReservationTable: React.FC = () => {
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
        <NavLink to={"/user/create"} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          + Create a reservation
        </NavLink>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="shadow bg-gray-50 border-b border-gray-300 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-3 w-[30%]">Visit name</th>
              <th className="px-6 py-3 w-[30%]">Destination</th>
              <th className="px-6 py-3 w-[15%]">Max visitor</th>
              <th className="px-6 py-3 w-[15%]">Start date</th>
              <th className="px-6 py-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-800">{res.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="font-semibold">{res.city}</div>
                  <div className="text-gray-500">{res.country}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{res.maxVisitor}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{res.startDate}</td>
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

export default ReservationTable;
