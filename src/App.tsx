import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanQR from './pages/ScanQR';
import TransactionComplete from './pages/TransactionComplete';
import TransactionError from './pages/TransactionError';

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/transaction" element={<TransactionComplete />} />
          <Route path="/transaction-error" element={<TransactionError />} />
        </Routes>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;