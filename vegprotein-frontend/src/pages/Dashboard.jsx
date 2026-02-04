import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [goal, setGoal] = useState(120);
  const [location, setLocation] = useState("San Francisco, CA");
  const nav = useNavigate();

  const foods = [
    { name: "Organic Tofu", protein: 20, price: 3.99, store: "Whole Foods", distance: "0.3 mi", perDollar: 5.0 },
    { name: "Red Lentils", protein: 26, price: 2.49, store: "Trader Joes", distance: "0.8 mi", perDollar: 10.4 },
    { name: "Chickpeas (canned)", protein: 15, price: 1.29, store: "Safeway", distance: "0.2 mi", perDollar: 11.6 },
    { name: "Quinoa", protein: 8, price: 4.99, store: "Whole Foods", distance: "0.3 mi", perDollar: 1.6 },
    { name: "Black Beans", protein: 15, price: 0.99, store: "Walmart", distance: "1.2 mi", perDollar: 15.2 },
    { name: "Tempeh", protein: 31, price: 3.49, store: "Sprouts", distance: "0.9 mi", perDollar: 8.9 },
    { name: "Edamame (frozen)", protein: 18, price: 2.99, store: "Trader Joes", distance: "0.8 mi", perDollar: 6.0 },
    { name: "Peanut Butter", protein: 25, price: 4.49, store: "Costco", distance: "2.1 mi", perDollar: 5.6 },
  ];

  const consumed = 67;
  const progress = Math.min((consumed / goal) * 100, 100);

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="font-semibold text-neutral-900">VegProtein</span>
          </Link>
          <button onClick={logout} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <div className="flex items-center gap-2 mt-1 text-neutral-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{location}</span>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium ml-1">Change</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-600">Daily Progress</h3>
              <span className="text-xs text-neutral-500">Today</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-neutral-900">{consumed}g</span>
              <span className="text-neutral-500 mb-1">/ {goal}g</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: progress + "%" }}></div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">{Math.round(progress)}% of daily goal</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-600">Protein Goal</h3>
              <button className="text-xs text-green-600 hover:text-green-700 font-medium">Edit</button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-neutral-300 rounded-lg text-lg font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="text-neutral-600">grams/day</span>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-600">Best Value Today</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Top Pick</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">Black Beans</p>
            <p className="text-sm text-neutral-600">15.2g protein per dollar</p>
            <p className="text-xs text-neutral-500 mt-1">Walmart - 1.2 mi away</p>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Nearby Protein Sources</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Sort by:</span>
              <select className="text-sm border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Protein/Dollar</option>
                <option>Distance</option>
                <option>Price</option>
                <option>Protein</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 text-left text-sm text-neutral-600">
                  <th className="px-6 py-3 font-medium">Food</th>
                  <th className="px-6 py-3 font-medium">Protein</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">g/$</th>
                  <th className="px-6 py-3 font-medium">Store</th>
                  <th className="px-6 py-3 font-medium">Distance</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {foods.sort((a, b) => b.perDollar - a.perDollar).map((food, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-neutral-900">{food.name}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{food.protein}g</td>
                    <td className="px-6 py-4 text-neutral-600">${food.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={idx === 0 ? "text-green-600 font-semibold" : "text-neutral-600"}>
                        {food.perDollar.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{food.store}</td>
                    <td className="px-6 py-4 text-neutral-500 text-sm">{food.distance}</td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
