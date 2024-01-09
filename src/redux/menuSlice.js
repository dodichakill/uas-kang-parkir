import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuActive: "beranda",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuActive: (state, action) => {
      state.menuActive = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuActive } = menuSlice.actions;

export default menuSlice.reducer;
