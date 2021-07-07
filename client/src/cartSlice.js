import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addItem: (state, action) => {
      // "mutate" the array by calling push()
      if (!state.some((item) => item.id === action.payload.id))
        state.push(action.payload);
      else
        state.forEach((item) => {
          if (item.id === action.payload.id)
            item.amount =
              parseInt(item.amount) + parseInt(action.payload.amount);
        });
      return state;
    },
    removeItem: (state, action) => {
      // Can still return an immutably-updated value if we want to
      return state.filter((item) => item.id !== action.payload.id);
    },
    updateItemAmount: (state, action) => {
      const id = action.payload.id;
      const amount = action.payload.amount;
      state.forEach((item) => {
        if (item.id === id) item.amount = amount;
      });
      return state;
    },
    clearCart: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItemAmount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
