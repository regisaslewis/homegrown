import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   currentUser: {},
    status: "idle",
    error: null
}

const LOGIN_URL = "/login"

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

const currentUserSlice =  createSlice({
    name: "currentUser",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentUser = action.payload;
            console.log(action.payload)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export const getCurrentUser = state => state.currentUser.currentUser;
export const getCurrentUserStatus = state => state.currentUser.status;
export const getCurrentUserError = state => state.users.error;

export default currentUserSlice.reducer