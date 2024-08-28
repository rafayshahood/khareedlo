import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockProducts from '../dataSoruce/mockProducts.json';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        resolve(JSON.parse(storedProducts)); 
      } else {
        resolve(mockProducts); 
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
