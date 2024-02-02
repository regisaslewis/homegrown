import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    user: {},
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

export const fetchOneUser = createAsyncThunk(
    "users/fetchOneUser",
    async (initialInfo) => {
        const { id } = initialInfo
        try {
            const response = await axios.get(`${USERS_URL}/${id}`, initialInfo)
            return response.data
        } catch (err) {
            return err.message;
        }
    }
)

export const addNewUser = createAsyncThunk(
    "users/addNewUser",
    async (initialInfo) => {
        try {
            const response = await axios.post(USERS_URL, initialInfo)
            return response.data
        } catch (err) {
            return err.message
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
        .addCase(addNewUser.fulfilled, (state, action) => {
            state.users.push(action.payload[0])
        })
        .addCase(fetchOneUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export const selectAllUsers = state => state.users.users;
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;
export const getOneUser = state => state.users.user;

export const selectUserByID = (state, id) => state.users.users.find(e => e.id === id)

export default usersSlice.reducer