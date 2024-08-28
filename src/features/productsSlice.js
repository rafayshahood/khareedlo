import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        resolve(JSON.parse(storedProducts)); // Use stored products if available
      } else {
        resolve(mockProducts); // Fallback to mock products
      }
    }, 1000);
  });
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateProduct: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;  // Update the specific product
        localStorage.setItem('products', JSON.stringify(state.items)); // Update local storage
      }
    },
    addProduct: (state, action) => {
      state.items.push(action.payload); // Add new product
      localStorage.setItem('products', JSON.stringify(state.items)); // Update local storage
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Delete product by ID
      localStorage.setItem('products', JSON.stringify(state.items)); // Update local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { updateProduct, addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
