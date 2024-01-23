import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    groups: [],
    status: "idle",
    error: null
}

const GROUPS_URL = "/groups"

export const fetchGroups = createAsyncThunk(
    "groups/fetchGroups",
    async () => {
        try {
            const response = await axios.get(GROUPS_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    } 
)

export const addNewGroup = createAsyncThunk(
    "group/addNewGroup",
    async (initialInfo) => {
        try {
            const response = await axios.post(GROUPS_URL, initialInfo)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(fetchGroups.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchGroups.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.groups = action.payload;
        })
        .addCase(fetchGroups.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(addNewGroup.fulfilled, (state, action) => {
            state.groups.push(action.payload[0])
        })
    }
})

export const selectAllGroups = state => state.groups.groups;
export const getGroupsStatus = state => state.groups.status;
export const getGroupsError = state => state.groups.error;

export default groupsSlice.reducer