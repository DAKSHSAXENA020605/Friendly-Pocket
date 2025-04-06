import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import Header from '../components/Header';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50">
      <Header />
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-3xl shadow-2xl inline-block">
            <Wallet size={80} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-500">
          Friendly Pocket
        </h1>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Travel light, pay smart! The easiest way to handle payments during your Indian adventure.
        </p>
        
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}