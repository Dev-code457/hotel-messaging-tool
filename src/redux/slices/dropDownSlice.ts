// dropdownSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: { selectedOption: null },
  reducers: {
    setOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setOption } = dropdownSlice.actions;
export default dropdownSlice.reducer;
