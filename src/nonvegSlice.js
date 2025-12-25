import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------------------------------
// LOCAL AXIOS INSTANCE
// ------------------------------------------------------
const apiurl = axios.create({
  baseURL: "https://backend-ten-flame-49.vercel.app/",
});

// Attach token automatically
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------------------------------------------
// FETCH NON-VEG PRODUCTS (THUNK)
// ------------------------------------------------------
export const fetchNonVegProducts = createAsyncThunk(
  "nonVeg/fetchNonVegProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiurl.get("/api/v1/products/nonveg");
      // Ensure we always return an array
      if (Array.isArray(response.data)) return response.data;
      if (response.data?.data && Array.isArray(response.data.data))
        return response.data.data;
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong"
      );
    }
  }
);

// ------------------------------------------------------
// INITIAL STATE
// ------------------------------------------------------
const initialState = {
  nonVegItems: [],
  loading: false,
  error: null,
};

// ------------------------------------------------------
// SLICE
// ------------------------------------------------------
const nonVegSlice = createSlice({
  name: "nonVeg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNonVegProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = Array.isArray(action.payload)
          ? action.payload
          : []; // fallback to empty array
        state.error = null;
      })
      .addCase(fetchNonVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default nonVegSlice.reducer;
