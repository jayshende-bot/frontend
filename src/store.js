
// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { use } from "react";


// let cartSlice = createSlice(
//     {
//         name: "cart",
//         initialState:[],
//         reducers:{
//             addToCart: (state,action) => {
//                 let iteam = state.find(iteam => iteam.id === action.payload)
//                 if(iteam){
//                     iteam.quality +=1;
//                 }
//                 else{
//                     state.push({...action.payload,quality:1})
//                 }
//             },
//             removeFromCart: (state,action) => {
//                 let index = state.findIndex(iteam => iteam.id === action.payload.id)
//                 if(index !== -1){
//                     state.splice(index,1);
//                 }

//             },
//         }
//     }
// );
// export const { addToCart, removeFromCart } = cartSlice.actions;

// // configure the store

// const Store = configureStore({
//     reducer:{
//         cart:cartSlice.reducer
//     }
// });


// export default Store;


// import { configureStore, createSlice } from "@reduxjs/toolkit";

// let cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       let item = state.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quality += 1;
//       } else {
//         state.push({ ...action.payload, quality: 1 });
//       }
//     },

//     removeFromCart: (state, action) => {
//       let index = state.findIndex((item) => item.id === action.payload.id);
//       if (index !== -1) {
//         state.splice(index, 1);
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// const Store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer,
//   },
// });

// // export default Store;import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// let cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       let item = state.find((item) => item.id === action.payload.id);

//       if (item) {
//         item.qty += 1;
//       } else {
//         state.push({ ...action.payload, qty: 1 });
//       }
//     },

//     increaseQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);
//       if (item) {
//         item.qty += 1;
//       }
//     },

//     decreaseQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);

//       if (!item) return;

//       if (item.qty > 1) {
//         item.qty -= 1;
//       } else {
//         // remove when qty = 1
//         return state.filter((i) => i.id !== action.payload);
//       }
//     },

//     removeFromCart: (state, action) => {
//       return state.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const { addToCart, increaseQty, decreaseQty, removeFromCart } =
//   cartSlice.actions;

// const Store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer,
//   },
// });
// const fetchVegProducts=()=>{
// async()=>{
// let response=await axios.get("http://localhost:3000/api/v1/products/Veg");
// }

// const fetchNonVegProducts=()=>{
// async()=>{
// let response=await axios.get("http://localhost:3000/api/v1/products/NonVeg");

// }
// }
// export default Store;import { configureStore } from "@reduxjs/toolkit";
// store.js
// store.jsimport { configureStore, createSlice } from "@reduxjs/toolkit";

// Reducers (Ensure these files are imported correctly in your project)
// src/store.js

// import { configureStore } from "@reduxjs/toolkit";

// // Reducers
// import vegReducer from "./vegSlice";
// import nonVegReducer from "./nonvegSlice";
// import orderReducer from "./orderSlice";
// // ✅ NEW IMPORT: Import the cart reducer from its new file
// import cartReducer from "./cartSlice";
// import drinkReducer from "./drinkSlice";


// // ------------------------------------------------------
// // FINAL STORE
// // ------------------------------------------------------
// const store = configureStore({
//   reducer: {
//     // ✅ Use the imported cartReducer
//     cart: cartReducer,
//     veg: vegReducer,
//     nonVeg: nonVegReducer,
//     orders: orderReducer,
//    drink: drinkReducer,
//   },
// });

// export default store;

// Note: You must remove the unused actions export if it was present here
// export const { addToCart, increaseQty, decreaseQty, removeFromCart } = cartSlice.actions;



import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import vegReducer from "./vegSlice";
import nonVegReducer from "./nonvegSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";
import drinkReducer from "./drinkSlice";

// ⭐ Global axios instance
export const apiurl = axios.create({
  baseURL: "https://backend-blue-eight-28.vercel.app/",
});

// ⭐ Add token automatically
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const store = configureStore({
  reducer: {
    cart: cartReducer,
    veg: vegReducer,
    nonVeg: nonVegReducer,
    orders: orderReducer,
    drink: drinkReducer,
  },
});

export default store;
