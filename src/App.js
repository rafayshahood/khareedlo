import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from './pages/productsPage';
import ProductDetailsPage from './pages/productDetailsPage';
import AddProductPage from './pages/addProduct';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/manage-products/:id" element={<ProductDetailsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
