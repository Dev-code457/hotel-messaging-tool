import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userDetails: any;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userDetails: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserDetailsPending(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserDetailsSuccess(state, action: PayloadAction<any>) {
            state.userDetails = action.payload;
            state.loading = false;
        },
        fetchUserDetailsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearUserDetails(state) {
            state.userDetails = null;
            state.error = null;
        },
    },
});

export const UserActions = userSlice.actions;
export default userSlice.reducer;
