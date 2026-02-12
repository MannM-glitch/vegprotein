import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, LogOut, Plus, X, Check, Minus } from "lucide-react";
import { FuturisticNav } from "../components/ui/futuristic-nav";

export default function Dashboard() {
  const [goal, setGoal] = useState(120);
  const [location] = useState("San Francisco");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(null);
  const [streakDays] = useState(7);
  const nav = useNavigate();

  const foods = [
    { id: 1, name: "Organic Tofu", protein: 20, price: 3.99, store: "Whole Foods", distance: "0.3", perDollar: 5.0 },
    { id: 2, name: "Red Lentils", protein: 26, price: 2.49, store: "Trader Joes", distance: "0.8", perDollar: 10.4 },
    { id: 3, name: "Chickpeas", protein: 15, price: 1.29, store: "Safeway", distance: "0.2", perDollar: 11.6 },
    { id: 4, name: "Quinoa", protein: 8, price: 4.99, store: "Whole Foods", distance: "0.3", perDollar: 1.6 },
    { id: 5, name: "Black Beans", protein: 15, price: 0.99, store: "Walmart", distance: "1.2", perDollar: 15.2 },
    { id: 6, name: "Tempeh", protein: 31, price: 3.49, store: "Sprouts", distance: "0.9", perDollar: 8.9 },
    { id: 7, name: "Edamame", protein: 18, price: 2.99, store: "Trader Joes", distance: "0.8", perDollar: 6.0 },
    { id: 8, name: "Peanut Butter", protein: 25, price: 4.49, store: "Costco", distance: "2.1", perDollar: 5.6 },
  ];

  const consumed = addedItems.reduce((acc, id) => {
    const food = foods.find(f => f.id === id);
    return acc + (food?.protein || 0);
  }, 0) + 67;
  
  const progress = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  const handleAddFood = (food) => setShowAddModal(food);

  const confirmAdd = () => {
    if (showAddModal) {
      setAddedItems([...addedItems, showAddModal.id]);
      setShowAddModal(null);
    }
  };

  const topPick = [...foods].sort((a, b) => b.perDollar - a.perDollar)[0];
  const sortedFoods = [...foods].sort((a, b) => b.perDollar - a.perDollar);

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Minimal Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-black text-sm">VP</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              <span className="font-medium">{location}</span>
            </div>
            <button onClick={logout} className="text-sm font-medium hover:underline underline-offset-4">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">
        {/* Big Number Hero */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
          <p className="text-sm font-medium text-stone-500 mb-2">TODAYS PROTEIN</p>
          <div className="flex items-end gap-4 mb-4">
            <motion.span initial={{ y: 20 }} animate={{ y: 0 }} className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter text-black">
              {consumed}
            </motion.span>
            <div className="mb-6">
              <span className="text-4xl sm:text-5xl font-light text-stone-400">/{goal}g</span>
            </div>
          </div>
          
          {/* Progress Bar - Sharp edges */}
          <div className="h-3 bg-stone-300 w-full max-w-md">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full bg-black" />
          </div>
          
          {/* Stats Row */}
          <div className="flex gap-12 mt-8">
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Remaining</p>
              <p className="text-3xl font-black">{remaining}g</p>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Streak</p>
              <p className="text-3xl font-black">{streakDays} days</p>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Items</p>
              <p className="text-3xl font-black">{addedItems.length + 3}</p>
            </div>
          </div>
        </motion.section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Top Pick */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-4">
            <div className="border-2 border-black bg-white p-6 sticky top-24">
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-stone-500">Best Value</p>
              <h2 className="text-4xl font-black mb-2 leading-tight">{topPick.name}</h2>
              <p className="text-6xl font-black text-green-600 mb-4">{topPick.perDollar.toFixed(1)}<span className="text-lg">g/$</span></p>
              
              <div className="space-y-2 text-sm border-t-2 border-black pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-stone-500">Store</span>
                  <span className="font-medium">{topPick.store}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Price</span>
                  <span className="font-medium">${topPick.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Protein</span>
                  <span className="font-medium">{topPick.protein}g</span>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAddFood(topPick)} className="w-full mt-6 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Today
              </motion.button>
            </div>

            {/* Goal Adjustment */}
            <div className="border-2 border-black bg-white p-6 mt-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-stone-500">Daily Goal</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setGoal(Math.max(50, goal - 10))} className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-4xl font-black flex-1 text-center">{goal}g</span>
                <button onClick={() => setGoal(goal + 10)} className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Food List */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500">Nearby Sources ({foods.length})</h2>
              <select className="text-sm font-medium bg-transparent border-b-2 border-black pb-1 cursor-pointer focus:outline-none">
                <option>By Value</option>
                <option>By Distance</option>
                <option>By Price</option>
              </select>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-3 border-b-2 border-black text-xs font-bold uppercase tracking-wider text-stone-500">
              <div className="col-span-4">Item</div>
              <div className="col-span-2 text-right">Protein</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">g/$</div>
              <div className="col-span-2"></div>
            </div>

            {/* Food Rows */}
            {sortedFoods.map((food, idx) => (
              <motion.div key={food.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.05 }} className={`grid grid-cols-12 gap-4 py-4 border-b border-stone-300 items-center hover:bg-stone-50 transition-colors ${addedItems.includes(food.id) ? "bg-green-50" : ""}`}>
                <div className="col-span-4">
                  <p className="font-bold text-black">{food.name}</p>
                  <p className="text-xs text-stone-500">{food.store} | {food.distance}mi</p>
                </div>
                <div className="col-span-2 text-right font-mono font-bold">{food.protein}g</div>
                <div className="col-span-2 text-right font-mono">${food.price}</div>
                <div className="col-span-2 text-right">
                  <span className={`font-mono font-black ${idx === 0 ? "text-green-600 text-lg" : ""}`}>{food.perDollar.toFixed(1)}</span>
                </div>
                <div className="col-span-2 text-right">
                  {addedItems.includes(food.id) ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                      <Check className="w-4 h-4" /> Added
                    </span>
                  ) : (
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleAddFood(food)} className="w-10 h-10 border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Add Modal - Brutalist Style */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white border-4 border-black p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Adding</p>
                  <h3 className="text-3xl font-black">{showAddModal.name}</h3>
                </div>
                <button onClick={() => setShowAddModal(null)} className="w-10 h-10 border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="border-2 border-black p-4 text-center">
                  <p className="text-3xl font-black">{showAddModal.protein}g</p>
                  <p className="text-xs font-medium text-stone-500 uppercase">Protein</p>
                </div>
                <div className="border-2 border-black p-4 text-center">
                  <p className="text-3xl font-black">${showAddModal.price}</p>
                  <p className="text-xs font-medium text-stone-500 uppercase">Price</p>
                </div>
                <div className="border-2 border-black p-4 text-center bg-green-100">
                  <p className="text-3xl font-black text-green-600">{showAddModal.perDollar.toFixed(1)}</p>
                  <p className="text-xs font-medium text-stone-500 uppercase">g/$</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(null)} className="flex-1 py-4 border-2 border-black font-bold text-sm uppercase tracking-wider hover:bg-stone-100 transition-colors">Cancel</button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={confirmAdd} className="flex-1 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FuturisticNav />
    </div>
  );
}
