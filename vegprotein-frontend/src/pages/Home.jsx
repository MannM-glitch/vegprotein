import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl animate-fade-in">

        {/* Icon */}
        <div className="text-5xl mb-4 animate-bounce">🥦</div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 animate-slide-in-down">
          Welcome to VegProtein
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg text-gray-700 animate-fade-in delay-100">
          Discover protein-rich vegetarian foods, set nutrition goals, and track your progress with ease.
        </p>

        {/* CTA Button */}
        <Link to="/login">
          <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 animate-slide-in-up">
            Get Started
          </button>
        </Link>

        {/* Extras */}
        <p className="mt-8 text-sm text-gray-500 animate-fade-in delay-200">
          No account? Don’t worry, sign up on the next page!
        </p>
      </div>
    </div>
  );
}
