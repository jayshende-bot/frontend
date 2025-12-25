import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------------------------------
// LOCAL AXIOS INSTANCE
// ------------------------------------------------------
const apiurl = axios.create({
  baseURL: "https://backend-blue-eight-28.vercel.app/",
});

// Attach token automatically
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ------------------------------------------------------
// FETCH DRINK PRODUCTS (THUNK)
// ------------------------------------------------------
export const fetchDrinkProducts = createAsyncThunk(
  "drink/fetchDrinkProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiurl.get("/api/v1/products/drink");

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
  drinkItems: [],
  loading: false,
  error: null,
};

// ------------------------------------------------------
// SLICE
// ------------------------------------------------------
const drinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinkProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinkProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.drinkItems = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchDrinkProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default drinkSlice.reducer;
