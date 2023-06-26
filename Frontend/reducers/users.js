import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: {
      lat: 0,
      lon: 0,
      address: "",
      city: "",
    },
    isAdmin: false,
    accesstoken: "",
  },
};

export const userSlice = createSlice({
  name: "user", //This is the name of the state
  initialState,
  reducers: {
    SetDeliveryAddress: (state, action) => {
      state.value.deliveryAddress.lat = action.payload.lat;
      state.value.deliveryAddress.lon = action.payload.lon;
      state.value.deliveryAddress.address = action.payload.address;
      state.value.deliveryAddress.city = action.payload.city;
    },
    SetCredentials: (state, action) => {
      state.value.id = action.payload.id;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    setPersonalData: (state, action) => {
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.phoneNumber = action.payload.phoneNumber;
    },
    disconnect: (state) => {
      for (let key in state.value) {
        if (typeof (state.value[key]) === "string")
          state.value[key] = null;
        else
          state.value[key] = {};
      }
    },
    setLoggedUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  SetDeliveryAddress,
  SetCredentials,
  setPersonalData,
  setLoggedUser,
  disconnect,
} = userSlice.actions;
export default userSlice.reducer;
