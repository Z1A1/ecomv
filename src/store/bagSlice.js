import { createSlice } from '@reduxjs/toolkit';

const bagSlice = createSlice({
  name: 'bag',
  initialState: { items: [] },
  reducers: {
    addToBag: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBag: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToBag, removeFromBag, increaseQuantity, decreaseQuantity } = bagSlice.actions;

export const selectBagItems = state => state.bag.items;
export const selectBagCount = state => state.bag.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectBagTotal = state => state.bag.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default bagSlice.reducer;
