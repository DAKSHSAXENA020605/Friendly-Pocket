import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

const TransactionError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Transaction Error</h1>
        
        <p className="text-gray-600 mb-6">
          Your transaction could not be completed. The money has not been received in your account.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-medium text-amber-800">
            Transaction ID: <span className="font-mono">TRX-12349</span>
          </p>
          <p className="text-sm font-medium text-amber-800 mt-1">
            Amount: <span className="font-mono">$450.00</span>
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Transaction
          </button>
          
          <Link to="/dashboard" className="w-full">
            <button 
              className="w-full text-gray-700 border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionError;
