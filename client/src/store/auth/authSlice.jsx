import { currentUser } from "@/services/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.loading = false;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearAuth } = authSlice.actions;

export const getCurrentUserAsync = createAsyncThunk(
  "auth/currentUser",
  async () => {
    return await currentUser();
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  return await axios.post(`${BASE_URL}/auth/logout`, null, {
    withCredentials: true,
  });
});

export const selectUser = (state) => state.auth;

export default authSlice.reducer;
