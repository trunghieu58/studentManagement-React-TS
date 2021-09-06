import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/user";

interface authState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

export interface loginPayload {
    username: string;
    password: string;
}

const initialState: authState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action: PayloadAction<loginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload
        },
        loginFail(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
})

export const authAction = authSlice.actions

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

const authReducer = authSlice.reducer;
export default authReducer;