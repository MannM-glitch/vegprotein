import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Leaf, ChevronRight, User, Mail, MapPin, Target, Bell, 
  Shield, LogOut, Camera, Award, Flame, TrendingUp, Calendar,
  Moon, Smartphone, HelpCircle, MessageSquare
} from "lucide-react";
import { FuturisticNav } from "../components/ui/futuristic-nav";

export default function Profile() {
  const nav = useNavigate();
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    location: "San Francisco, CA",
    goal: 120,
    joinDate: "Jan 2026",
    avatar: null,
  });

  const stats = [
    { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Goals Hit", value: "23", icon: Target, color: "text-green-500", bg: "bg-green-50" },
    { label: "This Month", value: "2.4kg", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Member Since", value: "Jan '26", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", subtitle: "Name, photo, bio" },
        { icon: Mail, label: "Email", subtitle: user.email },
        { icon: MapPin, label: "Location", subtitle: user.location },
        { icon: Target, label: "Daily Goal", subtitle: `${user.goal}g protein` },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", subtitle: "Reminders & alerts" },
        { icon: Moon, label: "Appearance", subtitle: "Light mode" },
        { icon: Smartphone, label: "Connected Apps", subtitle: "None connected" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", subtitle: "FAQs & guides" },
        { icon: MessageSquare, label: "Send Feedback", subtitle: "Help us improve" },
        { icon: Shield, label: "Privacy & Security", subtitle: "Data & permissions" },
      ]
    },
  ];

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-[#f5f5f7] to-[#f5f5f7]">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.02), 0 12px 24px rgba(0, 0, 0, 0.06);
        }
        .menu-row:active { background: rgba(0, 0, 0, 0.03); }
      `}</style>

      {/* Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-white/50"
      >
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-neutral-900 text-lg">Profile</span>
          </Link>
        </div>
      </motion.nav>

      <main className="max-w-2xl mx-auto px-6 py-8 pb-32">
        {/* Profile Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-green-500/30">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center border border-neutral-100"
              >
                <Camera className="w-4 h-4 text-neutral-500" />
              </motion.button>
            </motion.div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-neutral-900">{user.name}</h1>
              <p className="text-neutral-500 text-sm">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-600">Pro Member</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className={`${stat.bg} rounded-2xl p-3 text-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                <p className="text-lg font-bold text-neutral-900">{stat.value}</p>
                <p className="text-[10px] text-neutral-500 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + sIdx * 0.1 }}
            className="mb-6"
          >
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide px-1 mb-2">
              {section.title}
            </h2>
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-neutral-100">
              {section.items.map((item) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  className="menu-row w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-9 h-9 bg-neutral-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 text-sm">{item.label}</p>
                    <p className="text-xs text-neutral-400 truncate">{item.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-300" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full glass-card rounded-2xl px-4 py-4 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </motion.button>

        <p className="text-center text-xs text-neutral-400 mt-6">
          VegProtein v1.0.0 • Made with 🌱
        </p>
      </main>

      <FuturisticNav />
    </div>
  );
}
