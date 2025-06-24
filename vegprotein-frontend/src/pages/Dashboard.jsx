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
    <div className="p-6">
      <button onClick={logout} className="text-red-500">Logout</button>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <form onSubmit={saveGoal} className="mb-6">
        <label>Protein Goal (g/day): </label>
        <input
          type="number"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          className="border p-2 ml-2"
        />
        <button type="submit" className="bg-green-500 px-4 py-1 text-white ml-4">
          Save
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Protein-Rich Foods</h2>
      <ul className="list-disc pl-5">
        {foods.map(f => (
          <li key={f.id}>{f.name}: {f.protein}g, ${f.price}</li>
        ))}
      </ul>
    </div>
  );
}
