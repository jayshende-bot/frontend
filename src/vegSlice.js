// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // -----------------------------------------------
// // THUNK (calls backend API)
// // -----------------------------------------------
// export const fetchVegProducts = createAsyncThunk(
//   "veg/fetchVegProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/v1/products/veg");
//       return res.data; // returning veg items
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Server Error");
//     }
//   }
// );

// // -----------------------------------------------
// // SLICE
// // -----------------------------------------------
// const vegSlice = createSlice({
//   name: "veg",
//   initialState: {
//     vegItems: [],
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       // -------------------------
//       // 1) Pending (loading)
//       // -------------------------
//       .addCase(fetchVegProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       // -------------------------
//       // 2) Fulfilled (success)
//       // -------------------------
//       .addCase(fetchVegProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vegItems = action.payload;  // set vegItems here
//       })

//       // -------------------------
//       // 3) Rejected (error)
//       // -------------------------
//       .addCase(fetchVegProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// // });





















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// export const fetchVegProducts = createAsyncThunk(
//   "veg/fetchVegProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       // Token is automatically added by interceptor
//       const response = await apiurl.get("/api/v1/products/veg");

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Something went wrong"
//       );
//     }
//   }
// );

// const initialState = {
//   vegItems: [],
//   loading: false,
//   error: null,
// };

// const vegSlice = createSlice({
//   name: "veg",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchVegProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchVegProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vegItems = action.payload;
//       })
//       .addCase(fetchVegProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default vegSlice.reducer;















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ------------------------------------------------------
// // LOCAL AXIOS INSTANCE (NO EXTRA FILE NEEDED)
// // ------------------------------------------------------
// const apiurl = axios.create({
//   baseURL: "http://localhost:3000",
// });

// // Attach token automatically
// apiurl.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ------------------------------------------------------
// // FETCH VEG PRODUCTS (THUNK)
// // ------------------------------------------------------
// export const fetchVegProducts = createAsyncThunk(
//   "veg/fetchVegProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiurl.get("/api/v1/products/veg");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Something went wrong"
//       );
//     }
//   }
// );

// // ------------------------------------------------------
// // INITIAL STATE
// // ------------------------------------------------------
// const initialState = {
//   vegItems: [],
//   loading: false,
//   error: null,
// };

// // ------------------------------------------------------
// // SLICE
// // ------------------------------------------------------
// const vegSlice = createSlice({
//   name: "veg",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchVegProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchVegProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vegItems = action.payload;
//       })
//       .addCase(fetchVegProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default vegSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------------------------------
// AXIOS INSTANCE
// ------------------------------------------------------
const api = axios.create({
  baseURL: "https://backend-ten-flame-49.vercel.app/api/v1",
});

// ------------------------------------------------------
// ATTACH TOKEN (ONLY FOR PROTECTED ROUTES)
// ------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Orders are protected, products are public
  const protectedRoutes = ["/orders"];

  const isProtected = protectedRoutes.some((route) =>
    config.url?.startsWith(route)
  );

  if (token && isProtected) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ------------------------------------------------------
// FETCH VEG PRODUCTS (PUBLIC)
// ------------------------------------------------------
export const fetchVegProducts = createAsyncThunk(
  "products/fetchVegProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/veg");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch veg products"
      );
    }
  }
);

// ------------------------------------------------------
// FETCH ORDERS (PROTECTED)
// ------------------------------------------------------
export const fetchOrders = createAsyncThunk(
  "products/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ------------------------------------------------------
// INITIAL STATE
// ------------------------------------------------------
const initialState = {
  vegItems: [],
  orders: [],
  loading: false,
  error: null,
};

// ------------------------------------------------------
// SLICE
// ------------------------------------------------------
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // VEG PRODUCTS
      .addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vegItems = action.payload.data;
      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
