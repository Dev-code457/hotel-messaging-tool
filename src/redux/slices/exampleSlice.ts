import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 10000,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    MessagesUsed: (state) => {
      console.log("MessagesUsed action triggered"); // Debug log
      state.value -= 1; // Logic for decrementing the value
      console.log("New value after decrement:", state.value); // Log the new value
    },
  },
});

// Log the action creator
console.log("MessagesUsed action creator:", exampleSlice.actions.MessagesUsed);

export const { MessagesUsed } = exampleSlice.actions; // Correctly exported
export default exampleSlice.reducer; // Default export of the reducer
