import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const response = await axios.get(
      "https://backend.graycorp.io:9000/mymate/api/v1/tempClients"
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;