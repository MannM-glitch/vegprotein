import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, LayoutDashboard, User, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: 0, icon: <Home size={22} />, label: "Home", path: "/" },
  { id: 1, icon: <Search size={22} />, label: "Discover", path: "/discover" },
  { id: 2, icon: <LayoutDashboard size={22} />, label: "Dashboard", path: "/dashboard" },
  { id: 3, icon: <User size={22} />, label: "Profile", path: "/profile" },
  { id: 4, icon: <Settings size={22} />, label: "Settings", path: "/settings" },
];

const FuturisticNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active index based on current path
  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.path === location.pathname);
    return index >= 0 ? index : 0;
  };
  
  const [active, setActive] = useState(getActiveIndex);

  // Update active state when location changes
  React.useEffect(() => {
    setActive(getActiveIndex());
  }, [location.pathname]);

  const handleClick = (index, path) => {
    setActive(index);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-xl rounded-full px-4 sm:px-6 py-3 shadow-lg border border-neutral-200 overflow-hidden">
        
        {/* Active Indicator Glow */}
        <motion.div
          className="absolute w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-60"
          animate={{
            left: `calc(${active * (100 / navItems.length)}% + ${100 / navItems.length / 2}%)`,
            translateX: "-50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {/* Active Background Pill */}
        <motion.div
          className="absolute h-10 bg-green-100 rounded-full"
          animate={{
            width: 48,
            left: `calc(${active * (100 / navItems.length)}% + ${100 / navItems.length / 2}%)`,
            translateX: "-50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {navItems.map((item, index) => {
          const isActive = index === active;
          return (
            <motion.div key={item.id} className="relative flex flex-col items-center group">
              <motion.button
                onClick={() => handleClick(index, item.path)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full relative z-10 transition-colors ${
                  isActive 
                    ? "text-green-600" 
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {item.icon}
              </motion.button>

              {/* Tooltip */}
              <span className="absolute bottom-full mb-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-900 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { FuturisticNav };
