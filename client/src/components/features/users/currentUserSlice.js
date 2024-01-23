import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   currentUser: {},
    status: "idle",
    error: null
}

const LOGIN_URL = "/login"
const LOGOUT_URL = "/logout"
const CHECK_URL = "/check_session"

export const loginUser = createAsyncThunk(
    "currentUser/loginCurrentUser",
    async (initialInfo) => {
        try {
            const response = await axios.post(LOGIN_URL, initialInfo)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

export const logOutUser = createAsyncThunk(
    "currentUser/logOutCurrentUser",
    async () => {
        try {
            const response = await axios.delete(LOGOUT_URL)
            console.log("currentUser Logged Out", response.data)
        } catch (err) {
            return err.message
        }
    }
)

export const checkSession = createAsyncThunk(
    "currentUser/checkForCurrentUser",
    async () => {
        try {
            const response = await axios.get(CHECK_URL)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

const currentUserSlice =  createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers (builder) {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentUser = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.currentUser = {}
        })
        .addCase(checkSession.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addCase(checkSession.rejected, (state, action) =>{
            state.error = action.error.message;
        })
    }
})

export const { setUser } = currentUserSlice.actions;

export const getCurrentUser = state => state.currentUser.currentUser;
export const getCurrentUserStatus = state => state.currentUser.status;
export const getCurrentUserError = state => state.users.error;

export default currentUserSlice.reducer