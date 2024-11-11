import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthState from "@/types";

const initialState: AuthState = {
    isAuthenticated: false,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true,
                state.token = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false,
                state.token = null;
        },
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;