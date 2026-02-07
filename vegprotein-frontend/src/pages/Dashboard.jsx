import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, LogOut, Plus, TrendingUp, Target, Award, 
  ChevronRight, Sparkles, Leaf, ShoppingBag, Navigation,
  Check, Flame, Scan, Clock, Calendar, Zap
} from "lucide-react";
import { FuturisticNav } from "../components/ui/futuristic-nav";

export default function Dashboard() {
  const [goal, setGoal] = useState(120);
  const [location] = useState("San Francisco, CA");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(null);
  const [streakDays] = useState(7);
  const nav = useNavigate();

  const foods = [
    { id: 1, name: "Organic Tofu", protein: 20, price: 3.99, store: "Whole Foods", distance: "0.3 mi", perDollar: 5.0, emoji: "🧈" },
    { id: 2, name: "Red Lentils", protein: 26, price: 2.49, store: "Trader Joe\'s", distance: "0.8 mi", perDollar: 10.4, emoji: "🫘" },
    { id: 3, name: "Chickpeas", protein: 15, price: 1.29, store: "Safeway", distance: "0.2 mi", perDollar: 11.6, emoji: "🥫" },
    { id: 4, name: "Quinoa", protein: 8, price: 4.99, store: "Whole Foods", distance: "0.3 mi", perDollar: 1.6, emoji: "🌾" },
    { id: 5, name: "Black Beans", protein: 15, price: 0.99, store: "Walmart", distance: "1.2 mi", perDollar: 15.2, emoji: "🫛" },
    { id: 6, name: "Tempeh", protein: 31, price: 3.49, store: "Sprouts", distance: "0.9 mi", perDollar: 8.9, emoji: "🍖" },
    { id: 7, name: "Edamame", protein: 18, price: 2.99, store: "Trader Joe\'s", distance: "0.8 mi", perDollar: 6.0, emoji: "🌱" },
    { id: 8, name: "Peanut Butter", protein: 25, price: 4.49, store: "Costco", distance: "2.1 mi", perDollar: 5.6, emoji: "🥜" },
  ];

  const consumed = addedItems.reduce((acc, id) => {
    const food = foods.find(f => f.id === id);
    return acc + (food?.protein || 0);
  }, 0) + 67;
  
  const progress = Math.min((consumed / goal) * 100, 100);

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
  const avgCost = (foods.reduce((a, f) => a + f.price, 0) / foods.length).toFixed(2);

  const quickActions = [
    { icon: Scan, label: "Scan", color: "from-blue-500 to-cyan-500" },
    { icon: MapPin, label: "Stores", color: "from-orange-500 to-rose-500" },
    { icon: Calendar, label: "Plan", color: "from-purple-500 to-pink-500" },
    { icon: Clock, label: "History", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.02), 0 12px 24px rgba(0, 0, 0, 0.06);
        }
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .progress-glow { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
        .food-row:hover { background: rgba(34, 197, 94, 0.04); }
        .ios-button {
          background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%), linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 4px 8px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .ios-button:active { transform: scale(0.97); }
      `}</style>

      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-20 glass-card-strong border-b border-white/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <Leaf className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-semibold text-neutral-900 text-lg">VegProtein</span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="hidden sm:flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                <Flame className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-semibold">{streakDays} day streak</span>
            </motion.div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={logout} className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors px-3 py-2 rounded-xl hover:bg-neutral-100">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 mb-1">Good morning! 👋</h1>
          <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-neutral-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">Change <ChevronRight className="w-3 h-3" /></button>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="grid grid-cols-4 gap-3 mb-6">
          {quickActions.map((action, idx) => (
            <motion.button
              key={action.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 group"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-neutral-600">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} whileHover={{ y: -2, transition: { duration: 0.2 } }} className="glass-card rounded-3xl p-6 md:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Daily Progress</h3>
                </div>
                <p className="text-xs text-neutral-400">Updated just now</p>
              </div>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="relative">
                <svg className="w-32 h-32 -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <motion.circle cx="64" cy="64" r="56" fill="none" stroke="url(#progressGradient)" strokeWidth="12" strokeLinecap="round" initial={{ strokeDasharray: "0 352" }} animate={{ strokeDasharray: `${progress * 3.52} 352` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }} className="text-3xl font-bold text-neutral-900">{consumed}g</motion.span>
                  <span className="text-xs text-neutral-400">of {goal}g</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-500">Progress</span>
                    <span className="text-sm font-semibold text-green-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full progress-glow" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-neutral-50 rounded-2xl p-3">
                    <p className="text-xs text-neutral-400 mb-0.5">Remaining</p>
                    <p className="text-lg font-bold text-neutral-900">{Math.max(goal - consumed, 0)}g</p>
                  </div>
                  <div className="flex-1 bg-neutral-50 rounded-2xl p-3">
                    <p className="text-xs text-neutral-400 mb-0.5">Items</p>
                    <p className="text-lg font-bold text-neutral-900">{addedItems.length + 3}</p>
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-2xl p-3 hidden sm:block">
                    <p className="text-xs text-orange-500 mb-0.5">Streak</p>
                    <p className="text-lg font-bold text-orange-600">{streakDays}🔥</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} whileHover={{ y: -2, transition: { duration: 0.2 } }} className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Daily Goal</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="w-20 px-3 py-2.5 bg-neutral-50 border-0 rounded-xl text-2xl font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-shadow" />
              <span className="text-neutral-400 font-medium">grams</span>
            </div>
            <p className="text-xs text-neutral-400 mb-3">Recommended: 100-150g</p>
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-neutral-500">Avg spend: <span className="font-semibold text-neutral-700">${avgCost}</span>/item</span>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }} className="relative overflow-hidden rounded-3xl mb-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 shadow-xl shadow-green-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">{topPick.emoji}</motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span className="text-white/80 text-sm font-medium">Best Value Today</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{topPick.name}</h3>
                <p className="text-white/70 text-sm">{topPick.perDollar.toFixed(1)}g protein per dollar</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddFood(topPick)} className="ios-button px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2">
              <Plus className="w-5 h-5" />Add
            </motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-neutral-900 text-lg">Nearby Protein Sources</h2>
                <p className="text-xs text-neutral-400">{foods.length} items found near you</p>
              </div>
            </div>
            <select className="text-sm bg-neutral-50 border-0 rounded-xl px-4 py-2.5 font-medium text-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500/50">
              <option>Best Value</option>
              <option>Distance</option>
              <option>Price</option>
              <option>Protein</option>
            </select>
          </div>

          <div className="divide-y divide-neutral-100">
            {[...foods].sort((a, b) => b.perDollar - a.perDollar).map((food, idx) => (
              <motion.div key={food.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35 + idx * 0.05 }} className="food-row px-6 py-4 flex items-center justify-between transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-2xl">{food.emoji}</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-neutral-900">{food.name}</h3>
                      {idx === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold uppercase">Best</span>}
                      {addedItems.includes(food.id) && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold uppercase flex items-center gap-0.5"><Check className="w-2.5 h-2.5" /> Added</span>}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400 flex-wrap">
                      <span>{food.protein}g protein</span>
                      <span className="hidden sm:inline">${food.price.toFixed(2)}</span>
                      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />{food.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className={`text-lg font-bold ${idx === 0 ? "text-green-600" : "text-neutral-900"}`}>{food.perDollar.toFixed(1)}</p>
                    <p className="text-xs text-neutral-400">g/$</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleAddFood(food)} disabled={addedItems.includes(food.id)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${addedItems.includes(food.id) ? "bg-neutral-100 text-neutral-400" : "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600"}`}>
                    {addedItems.includes(food.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowAddModal(null)}>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-4xl">{showAddModal.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{showAddModal.name}</h3>
                  <p className="text-neutral-500">{showAddModal.store} - {showAddModal.distance}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-neutral-50 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-neutral-900">{showAddModal.protein}g</p>
                  <p className="text-xs text-neutral-400">Protein</p>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-neutral-900">${showAddModal.price}</p>
                  <p className="text-xs text-neutral-400">Price</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{showAddModal.perDollar.toFixed(1)}</p>
                  <p className="text-xs text-green-600">g/$</p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowAddModal(null)} className="flex-1 py-3.5 bg-neutral-100 text-neutral-700 font-semibold rounded-2xl hover:bg-neutral-200 transition-colors">Cancel</motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={confirmAdd} className="flex-1 py-3.5 ios-button text-white font-semibold rounded-2xl flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />Add to Today
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
