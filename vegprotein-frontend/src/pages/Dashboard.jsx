import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [goal, setGoal] = useState('');
  const [foods, setFoods] = useState([]);
  const nav = useNavigate();

  async function loadGoal() {
    try {
      const res = await API.get('/nutrition/goal');
      setGoal(res.data.protein_goal);
    } catch {
      setGoal('');
    }
  }

  async function saveGoal(e) {
    e.preventDefault();
    await API.post('/nutrition/goal', { protein_goal: parseFloat(goal) });
    alert('Goal saved');
  }

  useEffect(() => {
    loadGoal();
    API.get('/foods').then(res => setFoods(res.data));
  }, []);

  function logout() {
    localStorage.removeItem('token');
    nav('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">🍃 Dashboard</h1>
          <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
        </div>

        <form onSubmit={saveGoal} className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">Set Your Daily Protein Goal (grams):</label>
          <div className="flex">
            <input
              type="number"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="border border-green-300 px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">🥦 Protein-Rich Foods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="py-3 px-4 border-b">Food</th>
                <th className="py-3 px-4 border-b">Protein (g)</th>
                <th className="py-3 px-4 border-b">Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((f, idx) => (
                <tr key={idx} className="hover:bg-green-50">
                  <td className="py-2 px-4 border-b">{f.name}</td>
                  <td className="py-2 px-4 border-b">{f.protein}</td>
                  <td className="py-2 px-4 border-b">${f.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
