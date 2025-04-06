import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, X, IndianRupee } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import Header from '../components/Header';

export default function ScanQR() {
  const navigate = useNavigate();
  const { balance, deductPoints } = useWallet();
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    const paymentAmount = parseInt(amount);
    if (!paymentAmount || paymentAmount > balance) return;
    
    deductPoints(paymentAmount);
    navigate('/transaction', { state: { amount: paymentAmount } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50">
      <Header />
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="relative bg-black rounded-3xl overflow-hidden aspect-square shadow-xl border-4 border-orange-500">
          <Webcam
            className="w-full h-full object-cover"
            mirrored={false}
          />
          <div className="absolute inset-0 border-2 border-orange-500 opacity-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Camera size={48} className="mx-auto mb-2" />
                <p className="text-sm">Align QR code within the frame</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <X className="text-gray-800" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-6">
            Payment Details
          </h2>

          <div className="space-y-6">
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to pay"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {amount && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Current Balance:</p>
                  <p className="font-bold text-gray-800">{balance} points</p>
                </div>
                <div className="flex justify-between border-t-2 border-orange-200 pt-3">
                  <p className="text-gray-600">Points to be deducted:</p>
                  <p className="font-bold text-orange-500">{amount} points</p>
                </div>
                <div className="flex justify-between border-t-2 border-orange-200 pt-3">
                  <p className="text-gray-600">Remaining Balance:</p>
                  <p className="font-bold text-green-500">{balance - parseInt(amount || '0')} points</p>
                </div>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={!amount || parseInt(amount) > balance}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                amount && parseInt(amount) <= balance
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transform hover:scale-[1.02]' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}