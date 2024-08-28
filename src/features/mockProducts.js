import { createAsyncThunk } from '@reduxjs/toolkit';

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 12560,
    quantity: 10,
    expiryDate: '2024-12-31',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 8990,
    quantity: 5,
    expiryDate: '2024-11-30',
    image: 'https://via.placeholder.com/50',
  },
  // Add more products as needed
];


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 10000);
  });
});