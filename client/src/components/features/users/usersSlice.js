import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    buttonHighlight: 1,
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
    reducers: {
        highlightButton: (state, action) => {
            state.buttonHighlight = action.payload
        },
        sortNormal: (state) => {
            state.users.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0
            })
        },
        sortPlants: (state) => {
            state.users.sort((a, b) => {
                if (a.plants.length > b.plants.length) {
                    return -1
                } else if (a.plants.length < b.plants.length) {
                    return 1
                }
                return 0
            })
        },
        sortArticles: (state) => {
            state.users.sort((a, b) => {
                if (a.articles.length > b.articles.length) {
                    return -1
                } else if (a.articles.length < b.articles.length) {
                    return 1
                }
                return 0
            })
        },
    },
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
    }
})

export const { setUsers, highlightButton, sortNormal, sortPlants, sortArticles } = usersSlice.actions;

export const selectAllUsers = state => state.users.users;
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;
export const getButtonHightlight = state => state.users.buttonHighlight

export const selectUserByID = (state, id) => state.users.users.find(e => e.id === id)

export default usersSlice.reducer