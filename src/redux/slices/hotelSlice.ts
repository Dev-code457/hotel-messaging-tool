// slices/hotelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelState {
  details: any;  
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  details: null,
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    fetchHotelDetailsPending(state) {
      state.loading = true;
      state.error = null;
    },
    fetchHotelDetailsSuccess(state, action: PayloadAction<any>) {
      state.details = action.payload;
      state.loading = false;
    },
    fetchHotelDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice.reducer;
