import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    status: "idle",
    error: null
}

const USERS_URL = "/users"

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        try {
            const response = await axios.get(USERS_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    } 
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const selectAllUsers = state => state.users.users;
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;

export default usersSlice.reducer