const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    avatarUrl: null, // 👈 this is the magic
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
  },
});


export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { dispatch, getState }) => {
    const { id } = getState().auth.user;

    const res = await api.get(`/api/admin/${id}`);
    const user = res.data.data;

    dispatch(setUserProfile(user));

    if (user.photoUrl) {
      const avatar = await fetchUserImage(user.photoUrl);
      dispatch(setAvatar(avatar));
    }
  }
);


export const { setUserProfile, setAvatar } = userSlice.actions;
export default userSlice.reducer;
