import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'payment';
  timestamp: Date;
  currency?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addPoints: (amount: number, currency?: string) => void;
  deductPoints: (amount: number) => void;
  getTransactions: () => Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    const savedTransactions = localStorage.getItem('wallet_transactions');
    
    if (savedBalance) setBalance(Number(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wallet_balance', balance.toString());
    localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
  }, [balance, transactions]);

  const addPoints = (amount: number, currency?: string) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [...prev, {
      id: crypto.randomUUID(),
      amount,
      type: 'deposit',
      timestamp: new Date(),
      currency
    }]);
  };

  const deductPoints = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [...prev, {
        id: crypto.randomUUID(),
        amount,
        type: 'payment',
        timestamp: new Date()
      }]);
    }
  };

  const getTransactions = () => {
    return transactions;
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      addPoints,
      deductPoints,
      getTransactions
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}