import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Leaf, 
  Star, 
  ArrowRight, 
  Filter,
  Sparkles,
  Heart,
  Clock,
  DollarSign,
  Zap,
  X
} from "lucide-react";
import { FuturisticNav } from "../components/ui/futuristic-nav";

const categories = [
  { id: 1, name: "Legumes", icon: "🫘", color: "from-amber-400 to-orange-500", count: 24 },
  { id: 2, name: "Nuts & Seeds", icon: "🥜", color: "from-yellow-400 to-amber-500", count: 18 },
  { id: 3, name: "Grains", icon: "🌾", color: "from-lime-400 to-green-500", count: 15 },
  { id: 4, name: "Soy Products", icon: "🥗", color: "from-emerald-400 to-teal-500", count: 12 },
  { id: 5, name: "Dairy Alt", icon: "🥛", color: "from-blue-400 to-indigo-500", count: 9 },
  { id: 6, name: "Supplements", icon: "💪", color: "from-purple-400 to-pink-500", count: 21 },
];

const featuredProducts = [
  { 
    id: 1, 
    name: "Organic Black Beans", 
    protein: 21, 
    price: 2.49, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80",
    store: "Whole Foods",
    tag: "Best Value",
    tagColor: "bg-green-500"
  },
  { 
    id: 2, 
    name: "Hemp Seeds", 
    protein: 31, 
    price: 8.99, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1515543904323-87f7c438cd43?w=400&q=80",
    store: "Sprouts",
    tag: "High Protein",
    tagColor: "bg-purple-500"
  },
  { 
    id: 3, 
    name: "Extra Firm Tofu", 
    protein: 20, 
    price: 3.29, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    store: "Trader Joe's",
    tag: "Popular",
    tagColor: "bg-blue-500"
  },
  { 
    id: 4, 
    name: "Red Lentils", 
    protein: 26, 
    price: 3.99, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80",
    store: "Safeway",
    tag: "Quick Cook",
    tagColor: "bg-orange-500"
  },
  { 
    id: 5, 
    name: "Spirulina Powder", 
    protein: 57, 
    price: 15.99, 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80",
    store: "iHerb",
    tag: "Superfood",
    tagColor: "bg-teal-500"
  },
  { 
    id: 6, 
    name: "Tempeh Strips", 
    protein: 31, 
    price: 4.49, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    store: "Whole Foods",
    tag: "Fermented",
    tagColor: "bg-pink-500"
  },
];

const nearbyStores = [
  { id: 1, name: "Whole Foods Market", distance: "0.3 mi", deals: 12, image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80" },
  { id: 2, name: "Trader Joe's", distance: "0.8 mi", deals: 8, image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=80" },
  { id: 3, name: "Sprouts Farmers", distance: "1.2 mi", deals: 15, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" },
];

const trendingSearches = ["pea protein", "chickpea pasta", "nutritional yeast", "seitan", "chia seeds"];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [location] = useState("San Francisco");

  const filteredProducts = useMemo(() => {
    let products = featuredProducts;
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return products;
  }, [searchQuery]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-semibold text-stone-800 hidden sm:block">VegProtein</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-stone-600">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="font-medium">{location}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.01 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search protein sources, stores, recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-stone-100 border-2 border-transparent rounded-2xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              )}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${showFilters ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Trending searches */}
            <AnimatePresence>
              {!searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide"
                >
                  <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3 h-3" /> Trending:
                  </span>
                  {trendingSearches.map((term, i) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSearchQuery(term)}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full border border-green-100 hover:border-green-300 hover:shadow-sm transition-all whitespace-nowrap"
                    >
                      {term}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-32">
        {/* Categories */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              Categories
            </h2>
            <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1 group">
              View all 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCategory === cat.id 
                    ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/10' 
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-xs font-semibold text-stone-700 truncate">{cat.name}</p>
                <p className="text-[10px] text-stone-400">{cat.count} items</p>
                {selectedCategory === cat.id && (
                  <motion.div 
                    layoutId="categoryIndicator"
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Leaf className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Featured Products */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Top Protein Sources
            </h2>
            <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1 group">
              See all 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Tag */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 ${product.tagColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
                    {product.tag}
                  </span>
                  
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        favorites.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-stone-400'
                      }`} 
                    />
                  </motion.button>

                  {/* Protein Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                    <span className="text-sm font-bold text-green-600">{product.protein}g</span>
                    <span className="text-xs text-stone-500 ml-0.5">protein</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-stone-800 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-stone-600">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-stone-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {product.store}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-stone-800">{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Nearby Stores */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Stores Near You
            </h2>
            <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1 group">
              View map 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nearbyStores.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 cursor-pointer"
              >
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                />
                <div className="relative p-5">
                  <h3 className="font-bold text-white text-lg mb-1">{store.name}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-stone-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {store.distance}
                    </span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {store.deals} deals
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Discover your perfect protein match
              </h2>
              <p className="text-green-100 mb-6 max-w-md">
                Take our quick quiz to get personalized recommendations based on your dietary needs and goals.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg shadow-green-700/20"
                >
                  Take the Quiz
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-green-500 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  2 min
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Bottom Navigation */}
      <FuturisticNav />
    </div>
  );
}
