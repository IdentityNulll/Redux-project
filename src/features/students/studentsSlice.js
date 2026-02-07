import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
// import fetchUserImage if you use it

export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/student");
      const user = res.data.data;

      const { id, role, photoUrl, ...profile } = user;

      let avatar = null;
      if (photoUrl) {
        avatar = await fetchUserImage(photoUrl);
      }

      return { profile, avatar };
    } catch (err) {
      return rejectWithValue("Failed to fetch student profile");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    profile: {
      firstName: null,
      lastName: null,
      mail: null,
      birthday: null,
      photoUrl: null,
    },
    avatarUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.avatarUrl = action.payload.avatar;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
