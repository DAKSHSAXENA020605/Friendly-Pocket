import React from 'react';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 shadow-lg">
      <Link to="/" className="flex items-center justify-center gap-3">
        <div className="bg-white p-2 rounded-xl shadow-md">
          <Wallet size={32} className="text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">Friendly Pocket</h1>
      </Link>
    </div>
  );
}