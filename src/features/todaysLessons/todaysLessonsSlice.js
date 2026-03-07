import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const DAY_MAP = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const fetchTodayLessons = createAsyncThunk(
  "lessons/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/lessons");
      const lessons = res.data.data;

      const today = DAY_MAP[new Date().getDay()];

      return lessons
        .filter((lesson) => lesson.dayOfWeek === today)
        .map((lesson) => ({
          id: lesson.id,
          name: lesson.name,
          teacher: {
            firstName: lesson.teacherResponseDto?.firstName ?? "",
            lastName: lesson.teacherResponseDto?.lastName ?? "",
          },
          period: lesson.period,
        }));
    } catch (err) {
      return rejectWithValue("Failed to fetch today's lessons");
    }
  }
);

const todaysLessonsSlice = createSlice({
  name: "todaysLessons",
  initialState: {
    today: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(fetchTodayLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todaysLessonsSlice .reducer;
