import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    uri: null,
  },
};

export const userSlice = createSlice({
  name: "picture", //This is the name of the state
  initialState,
  reducers: {
    SetPicture: (state, action) => {
      state.value.uri = action.payload;
      console.log("uri = " + state.value.uri);
    },
    ClearPicture: (state) => {
      state.uri = null;
    },
  },
});

export const {
  SetPicture,
  ClearPicture,
} = userSlice.actions;
export default userSlice.reducer;
