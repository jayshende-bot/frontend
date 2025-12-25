// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // 🛠️ FIX: Find the item using the MongoDB unique identifier (_id)
      const item = state.find((i) => i._id === action.payload._id);
      
      if (item) {
        // If item exists, just increment quantity
        item.qty += 1;
      } else {
        // If item is new, add it with initial quantity of 1
        if (action.payload._id) { 
             state.push({ ...action.payload, qty: 1 });
        }
      }
    },

    increaseQty: (state, action) => {
      // 🛠️ FIX: Look up by _id (action.payload is expected to be the _id string)
      const item = state.find((i) => i._id === action.payload);
      if (item) item.qty++;
    },

    decreaseQty: (state, action) => {
      // 🛠️ FIX: Look up by _id (action.payload is expected to be the _id string)
      const item = state.find((i) => i._id === action.payload);
      
      if (!item) return state;

      if (item.qty > 1) {
        item.qty--;
      } else {
        // 🛠️ FIX: Filter by _id
        return state.filter((i) => i._id !== action.payload);
      }
    },

    removeFromCart: (state, action) => {
      // 🛠️ FIX: Filter by _id
      return state.filter((i) => i._id !== action.payload);
    },
    
    clearCart: (state) => {
        return [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;