import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchClasses = createAsyncThunk(
  "class/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/class/all");
      const classes = res.data.data;

      return classes.map((cls) => ({
        uuid: cls.uuid,
        name: cls.name,
        studentCount: cls.students?.length || 0,
      }));
    } catch (err) {
      return rejectWithValue("Failed to fetch classes");
    }
  },
);

const classSlice = createSlice({
  name: "class",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classSlice.reducer;
