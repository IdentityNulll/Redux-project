import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { dispatch, getState }) => {
    const authUser = getState().auth.user;

    if (!authUser?.id) return;

    dispatch(setLoading(true));

    try {
      const res = await api.get(`/admin/${authUser.id}`);
      const user = res.data.data;

      const { id, role, photoUrl, ...profileData } = user;

      dispatch(setUserProfile(profileData));

      if (photoUrl) {
        const avatar = await fetchUserImage(photoUrl);
        dispatch(setAvatar(avatar));
      }
    } finally {
      dispatch(setLoading(false))
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      firstName: null,
      lastName: null,
      mail: null,
      birthday: null,
      photoUrl: null,
      loading: false,
    },
    avatarUrl: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserProfile, setAvatar, setLoading } = userSlice.actions;
export default userSlice.reducer;
