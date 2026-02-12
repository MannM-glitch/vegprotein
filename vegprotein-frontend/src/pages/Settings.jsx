import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Leaf, ChevronRight, Bell, Moon, Sun, Globe, Lock, 
  Smartphone, Database, Trash2, Download, Shield,
  Volume2, Vibrate, Eye, EyeOff, ToggleLeft, ToggleRight
} from "lucide-react";
import { FuturisticNav } from "../components/ui/futuristic-nav";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [showProtein, setShowProtein] = useState(true);

  const Toggle = ({ enabled, onToggle }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-neutral-300'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
      />
    </motion.button>
  );

  const settingsSections = [
    {
      title: "Notifications",
      items: [
        { 
          icon: Bell, 
          label: "Push Notifications", 
          subtitle: "Daily reminders & alerts",
          toggle: true,
          enabled: notifications,
          onToggle: () => setNotifications(!notifications)
        },
        { 
          icon: Volume2, 
          label: "Sound Effects", 
          subtitle: "Play sounds on actions",
          toggle: true,
          enabled: sound,
          onToggle: () => setSound(!sound)
        },
        { 
          icon: Vibrate, 
          label: "Haptic Feedback", 
          subtitle: "Vibration on interactions",
          toggle: true,
          enabled: haptics,
          onToggle: () => setHaptics(!haptics)
        },
      ]
    },
    {
      title: "Appearance",
      items: [
        { 
          icon: darkMode ? Moon : Sun, 
          label: "Dark Mode", 
          subtitle: darkMode ? "Currently enabled" : "Currently disabled",
          toggle: true,
          enabled: darkMode,
          onToggle: () => setDarkMode(!darkMode)
        },
        { 
          icon: showProtein ? Eye : EyeOff, 
          label: "Show Protein Values", 
          subtitle: "Display g/$ on food items",
          toggle: true,
          enabled: showProtein,
          onToggle: () => setShowProtein(!showProtein)
        },
        { 
          icon: Globe, 
          label: "Language", 
          subtitle: "English (US)",
          action: true
        },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Lock, label: "Change Password", subtitle: "Update your password", action: true },
        { icon: Shield, label: "Two-Factor Auth", subtitle: "Not enabled", action: true },
        { icon: Smartphone, label: "Active Sessions", subtitle: "1 device", action: true },
      ]
    },
    {
      title: "Data",
      items: [
        { icon: Download, label: "Export Data", subtitle: "Download your data", action: true },
        { icon: Database, label: "Clear Cache", subtitle: "Free up storage", action: true },
        { icon: Trash2, label: "Delete Account", subtitle: "Permanently delete", action: true, danger: true },
      ]
    },
  ];

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
        .setting-row:active { background: rgba(0, 0, 0, 0.02); }
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
            <span className="font-semibold text-neutral-900 text-lg">Settings</span>
          </Link>
        </div>
      </motion.nav>

      <main className="max-w-2xl mx-auto px-6 py-8 pb-32">
        {/* Settings Sections */}
        {settingsSections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + sIdx * 0.1 }}
            className="mb-6"
          >
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide px-1 mb-2">
              {section.title}
            </h2>
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-neutral-100">
              {section.items.map((item) => (
                <motion.div
                  key={item.label}
                  whileTap={{ scale: item.action ? 0.98 : 1 }}
                  className={`setting-row w-full px-4 py-3.5 flex items-center gap-3 transition-colors ${
                    item.action ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    item.danger ? 'bg-red-100' : 'bg-neutral-100'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-neutral-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`font-medium text-sm ${item.danger ? 'text-red-600' : 'text-neutral-900'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">{item.subtitle}</p>
                  </div>
                  {item.toggle && (
                    <Toggle enabled={item.enabled} onToggle={item.onToggle} />
                  )}
                  {item.action && (
                    <ChevronRight className="w-5 h-5 text-neutral-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-neutral-900">VegProtein</h3>
          <p className="text-xs text-neutral-400 mt-1">Version 1.0.0</p>
          <p className="text-xs text-neutral-400">Made with 🌱 in San Francisco</p>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <button className="text-xs text-green-600 hover:text-green-700 font-medium">
              Terms of Service
            </button>
            <span className="text-neutral-300">•</span>
            <button className="text-xs text-green-600 hover:text-green-700 font-medium">
              Privacy Policy
            </button>
          </div>
        </motion.div>
      </main>

      <FuturisticNav />
    </div>
  );
}
