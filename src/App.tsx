import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanQR from './pages/ScanQR';
import TransactionComplete from './pages/TransactionComplete';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/transaction" element={<TransactionComplete />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;