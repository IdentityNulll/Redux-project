import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/all-users?page=${page}&size=${size}`);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue("Failed to fetch users");
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: 10,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.list = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.number;
        state.size = action.payload.size;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
