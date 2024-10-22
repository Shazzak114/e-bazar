import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SellerDashboard from './pages/SellerDashboard';
import LocationPrompt from './components/LocationPrompt';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import SellerLoginPage from './pages/SellerLoginPage';
import SellerSignUpPage from './pages/SellerSignUpPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    const storedLocationPermission = localStorage.getItem('locationAllowed');
    if (storedLocationPermission === 'true') {
      setLocationAllowed(true);
    }
  }, []);

  const handleLocationAllow = () => {
    setLocationAllowed(true);
    localStorage.setItem('locationAllowed', 'true');
  };

  if (!locationAllowed) {
    return <LocationPrompt onAllow={handleLocationAllow} />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/seller-login" element={<SellerLoginPage />} />
              <Route path="/seller-signup" element={<SellerSignUpPage />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;