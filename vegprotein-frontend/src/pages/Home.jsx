import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GradientButton } from "../components/ui/gradient-button";
import { CardStack } from "../components/ui/card-stack";
import { BeamsBackground } from "../components/ui/beams-background";

const featureCards = [
  {
    id: 1,
    title: "Local Discovery",
    description: "Find protein-rich foods at stores near you with real-time price tracking",
    imageSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    tag: "Location",
  },
  {
    id: 2,
    title: "Nutrition Tracking",
    description: "Set daily protein goals and monitor your intake with detailed breakdowns",
    imageSrc: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    tag: "Health",
  },
  {
    id: 3,
    title: "Price Comparison",
    description: "Compare protein-per-dollar across products to maximize your budget",
    imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tag: "Savings",
  },
  {
    id: 4,
    title: "Plant-Based Focus",
    description: "Curated selection of vegetarian and vegan protein sources",
    imageSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    tag: "Vegan",
  },
  {
    id: 5,
    title: "Smart Recommendations",
    description: "AI-powered suggestions based on your goals and preferences",
    imageSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    tag: "AI",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with Beams Background */}
      <BeamsBackground intensity="medium">
        {/* Navigation */}
        <nav className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-semibold text-white">VegProtein</span>
            </div>
            <Link to="/login">
              <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign in
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)] px-6">
          <div className="max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-green-400 text-sm font-medium tracking-wide uppercase mb-6"
            >
              Plant-based nutrition made simple
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight"
            >
              Find protein-rich foods
              <span className="text-green-400"> near you</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-white/70 leading-relaxed"
            >
              VegProtein scans local grocery stores and markets to find the best deals on 
              plant-based protein sources in your area. Compare prices, track nutrition, 
              and hit your protein goals without the guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/login">
                <GradientButton>Get started</GradientButton>
              </Link>
              <GradientButton variant="variant">Learn more</GradientButton>
            </motion.div>
          </div>
        </div>
      </BeamsBackground>

      {/* Features Section - Light background */}
      <div className="bg-white">
        <main className="max-w-6xl mx-auto px-6">
          {/* Features Card Stack */}
          <div className="py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Everything you need
              </h2>
              <p className="text-neutral-600 max-w-xl mx-auto">
                Powerful features to help you find, track, and optimize your plant-based protein intake
              </p>
            </div>
            
            <CardStack
              items={featureCards}
              initialIndex={0}
              autoAdvance={true}
              intervalMs={3500}
              pauseOnHover={true}
              showDots={true}
              cardWidth={480}
              cardHeight={300}
              overlap={0.5}
              spreadDeg={40}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p className="text-sm text-neutral-500">
              © 2026 VegProtein. Built for plant-based athletes.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
