import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import Header from '../components/Header';

export default function TransactionComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { balance, transactions } = useWallet();
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50">
      <Header />
      <div className="flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border-2 border-orange-100">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="text-green-500" size={64} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 mb-4">
            Payment Successful!
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
              <p className="text-gray-600">Amount Paid</p>
              <p className="text-2xl font-bold text-orange-500">{amount} points</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <p className="text-gray-600">Remaining Balance</p>
              <p className="text-2xl font-bold text-green-500">{balance} points</p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Transaction Details</h3>
                <Clock className="text-orange-500" size={20} />
              </div>
              <p className="text-sm text-gray-600">
                Transaction ID: {transactions[transactions.length - 1]?.id.slice(0, 8)}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}