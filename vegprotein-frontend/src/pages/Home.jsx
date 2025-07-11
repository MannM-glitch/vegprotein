import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to VegProtein Tracker</h1>
      <p className="mb-4">Track affordable vegetarian protein sources, set goals, and more.</p>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</Link>
    </div>
  );
}
