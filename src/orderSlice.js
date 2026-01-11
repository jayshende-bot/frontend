

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ------------------------------------------------------
// // AXIOS INSTANCE (with token support)
// // ------------------------------------------------------
// const apiurl = axios.create({
//   baseURL: "https://tasty-bites-backend.vercel.app/api/v1", // backend base URL
// });

// // Attach token automatically for every request
// apiurl.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ------------------------------------------------------
// // THUNKS
// // ------------------------------------------------------

// // 1️⃣ Fetch user orders
// export const getUserOrders = createAsyncThunk(
//   "orders/getUserOrders",
//   async (email, { rejectWithValue }) => {
//     try {
//       // Matches backend route: GET /api/v1/products/orders/user/:email
//       const res = await apiurl.get(`/products/orders/user/${email}`);
//       return res.data.data || []; // backend returns { success: true, data: [...] }
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // 2️⃣ Create a new order
// export const createNewOrder = createAsyncThunk(
//   "orders/createNewOrder",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       // Matches backend route: POST /api/v1/products/orders
//       const res = await apiurl.post("/products/orders", orderData);
//       return res.data.data; // backend returns { success: true, data: order }
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // ------------------------------------------------------
// // SLICE
// // ------------------------------------------------------
// const orderSlice = createSlice({
//   name: "orders",
//   initialState: {
//     userOrders: [],
//     loading: false,       // for getUserOrders
//     error: null,          // for getUserOrders
//     createLoading: false, // for createNewOrder
//     createError: null,    // for createNewOrder
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // --- getUserOrders ---
//       .addCase(getUserOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userOrders = action.payload || [];
//       })
//       .addCase(getUserOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // --- createNewOrder ---
//       .addCase(createNewOrder.pending, (state) => {
//         state.createLoading = true;
//         state.createError = null;
//       })
//       .addCase(createNewOrder.fulfilled, (state, action) => {
//         state.createLoading = false;
//         state.userOrders.push(action.payload); // Add new order to state
//       })
//       .addCase(createNewOrder.rejected, (state, action) => {
//         state.createLoading = false;
//         state.createError = action.payload;
//       });
//   },
// });

// export default orderSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = axios.create({
  baseURL: "https://tasty-bites-backend.vercel.app/api/v1",
});

// Attach token automatically for every request
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (email, { rejectWithValue }) => {
    try {
      const res = await apiurl.get(`/products/orders/user/${email}`);
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { email, items } = orderData;
      if (!email) throw new Error("Email is required.");
      if (!items || !Array.isArray(items) || items.length === 0)
        throw new Error("Items are required and must be a non-empty array.");

      const validItems = items.every(
        (i) =>
          i.productId &&
          typeof i.productId === "string" &&
          i.id &&
          typeof i.id === "string" &&
          i.name &&
          typeof i.name === "string" &&
          i.price != null &&
          typeof i.price === "number" &&
          i.quantity != null &&
          typeof i.quantity === "number"
      );

      if (!validItems)
        throw new Error(
          "Each item must have productId(string), id(string), name(string), price(number), quantity(number)."
        );

      const res = await apiurl.post("/products/orders", { email, items });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    userOrders: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload || [];
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Get Orders Error:", action.payload);
      })
      .addCase(createNewOrder.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.userOrders.push(action.payload);
        console.log("Order Created Successfully:", action.payload);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
        console.log("Create Order Failed:", action.payload);
      });
  },
});

export default orderSlice.reducer;
