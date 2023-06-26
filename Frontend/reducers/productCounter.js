import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "productCounter",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id, imageUrl, price, priceUnit, title, description } = action.payload;

      const existingProduct = state.value.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.value.push({
          title,
          id,
          imageUrl,
          price,
          priceUnit,
          description,
          quantity: 1,
        });
      }
    },

    decrement: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.value.find((product) => product.id === id);

      if (existingProduct) {
        if (existingProduct.quantity > 0) existingProduct.quantity -= 1;
        if (existingProduct.quantity === 0) {
          const index = state.value.findIndex((product) => product.id === id);
          state.value.splice(index, 1);
        }
      }
    },

    resetCounter: (state) => {
      state.value = [];
    },
  },
});

export const { increment, decrement, resetCounter } = counterSlice.actions;
export default counterSlice.reducer;
