import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightLeft, Wallet, Clock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import Header from '../components/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const { balance, addPoints, transactions } = useWallet();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const exchangeRate = 82.5; // Example rate: 1 USD = 82.5 INR
  const pointsRate = 1; // 1 INR = 1 point

  const calculatePoints = () => {
    const amountNum = parseFloat(amount) || 0;
    const inrAmount = amountNum * exchangeRate;
    return Math.round(inrAmount * pointsRate);
  };

  const handleAddPoints = () => {
    const points = calculatePoints();
    if (points > 0) {
      addPoints(points, currency);
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50">
      <Header />
      <div className="max-w-md mx-auto p-6 space-y-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-6">
            Currency Converter
          </h2>
          
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 p-4 border-2 border-orange-100 rounded-xl text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter amount"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-4 border-2 border-orange-100 rounded-xl bg-white text-lg w-32 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="text-orange-500" />
                  <span className="text-gray-600">INR Value:</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  ₹{((parseFloat(amount) || 0) * exchangeRate).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t-2 border-orange-200 pt-4">
                <span className="text-gray-600">Points Value:</span>
                <span className="text-2xl font-bold text-orange-500">{calculatePoints()} points</span>
              </div>
            </div>

            <button
              onClick={handleAddPoints}
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                amount && parseFloat(amount) > 0
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Points
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-orange-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Current Balance
            </h2>
            <Wallet className="text-orange-500" size={28} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-4xl font-bold text-orange-500">{balance} points</p>
            <p className="text-gray-500 mt-2">Available Balance</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Recent Activity
            </h2>
            <Clock className="text-orange-500" size={24} />
          </div>
          <div className="space-y-4">
            {transactions.slice(-3).reverse().map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800">
                    {transaction.type === 'deposit' ? 'Added Points' : 'Payment'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className={`font-bold ${
                  transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/scan')}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}