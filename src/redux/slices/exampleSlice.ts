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
  
      state.value -= 1; // Logic for decrementing the value

    },
  },
});

// Log the action creator
console.log("MessagesUsed action creator:", exampleSlice.actions.MessagesUsed);

export const { MessagesUsed } = exampleSlice.actions; // Correctly exported
export default exampleSlice.reducer; // Default export of the reducer
