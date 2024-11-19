import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelState {
  details: any;  // Define the shape of your hotel data here
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
      state.details = action.payload;  // Updates hotel details in Redux
      state.loading = false;
    },
    fetchHotelDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateHotelName(state, action: PayloadAction<string>) {
      if (state.details) {
        state.details.UserDetails.hotelName = action.payload;  // Update the hotel name directly in the Redux store
      }
    }
  },
});

export const hotelActions = hotelSlice.actions;  // This exports the actions
export default hotelSlice.reducer;
