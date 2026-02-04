import React from "react";
import { Link } from "react-router-dom";
import { GradientButton } from "../components/ui/gradient-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="font-semibold text-neutral-900">VegProtein</span>
          </div>
          <Link to="/login">
            <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Location-based protein finder
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Find protein-rich foods
              <span className="text-green-600"> near you</span>
            </h1>
            
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              VegProtein scans local grocery stores and markets to find the best deals on 
              plant-based protein sources in your area. Compare prices, track nutrition, 
              and hit your protein goals without the guesswork.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <GradientButton>Get started</GradientButton>
              </Link>
              <GradientButton variant="variant">Learn more</GradientButton>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16 border-t border-neutral-200">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Local Discovery</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Automatically finds stores near your location with the best protein options and prices.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Nutrition Tracking</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Set daily protein goals and track your intake with detailed nutritional breakdowns.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">Price Comparison</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Compare protein-per-dollar across products and stores to maximize your budget.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-sm text-neutral-500">
            © 2026 VegProtein. Built for plant-based athletes.
          </p>
        </div>
      </footer>
    </div>
  );
}
