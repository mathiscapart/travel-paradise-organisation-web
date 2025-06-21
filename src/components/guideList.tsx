import { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { IUser } from '../context/AuthContext';
import {NavLink} from "react-router-dom";

const GuideTable = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return;

      try {
        const res = await axios.get<IUser[]>('http://127.0.0.1:3000/users');
        const filtered = res.data.filter(
          (u) => u.organisationId == user.organisationId && u.role == 'guide'
        );
        setUsers(filtered);
      } catch (err: any) {
        setError('Erreur lors du chargement des utilisateurs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (!user) return <p className="text-center text-gray-500">Veuillez vous connecter.</p>;
  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

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
          + Ajouter un utilisateur
        </NavLink>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="shadow bg-gray-50 border-b border-gray-300 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-3 w-[25%]">First Name</th>
              <th className="px-6 py-3 w-[25%]">Last Name</th>
              <th className="px-6 py-3 w-[30%]">Email</th>
              <th className="px-6 py-3 w-[10%]">Role</th>
              <th className="px-6 py-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-800">{u.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{u.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{u.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{u.role}</td>
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

export default GuideTable;
