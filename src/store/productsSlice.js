import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../utils/api';

export const loadProducts = createAsyncThunk('products/fetch', async () => fetchProducts());

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => { state.status = 'loading'; })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectProducts = state => state.products.items;
export const selectProductsStatus = state => state.products.status;

export default productsSlice.reducer;
