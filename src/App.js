import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/manage-products/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<LoginPage />} /> {/* Redirect to login by default */}

      </Routes>
    </Router>
  );
}

export default App;
