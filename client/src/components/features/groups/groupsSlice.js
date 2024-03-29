import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    groups: [],
    formVisibility: false,
    buttonHighlight: 1,
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

export const addCurrentUser = createAsyncThunk(
    "group/addCurrentUser",
    async (initialInfo) => {
        const { id } = initialInfo
        try {
            const response = await axios.post(`${GROUPS_URL}/${id}`, initialInfo)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setFormVisibility: (state, action) => {
            state.formVisibility = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        highlightButton: (state, action) => {
            state.buttonHighlight = action.payload
        },
        sortNormal: (state) => {
            state.groups.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0
            })
        },
        sortName: (state) => {
            state.groups.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                } else if (a.name > b.name) {
                    return 1
                }
                return 0
            })
        },
        sortMembers: (state) => {
            state.groups.sort((a, b) => {
                if (a.users.length > b.users.length) {
                    return -1
                } else if (a.users.length < b.users.length) {
                    return 1
                } else {
                    return 0
                }
            })
        },
        sortNewest: (state) => {
            state.groups.sort((a, b) => {
                if (a.id > b.id) {
                    return -1
                } else if (a.id < b.id) {
                    return 1
                }
                return 0
            })
        },
    },
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
        .addCase(addCurrentUser.fulfilled, (state, action) => {
            const { id } = action.payload[0];
            const otherGroups = state.groups.filter(e => e.id !== id);
            state.groups = [...otherGroups, action.payload[0]]
            state.groups.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0;
            })
        })
    }
})

export const { 
    setFormVisibility, 
    setGroups,
    highlightButton,
    sortNormal,
    sortName,
    sortMembers,
    sortNewest } = groupsSlice.actions;

export const getFormVisibility = state => state.groups.formVisibility;
export const selectAllGroups = state => state.groups.groups;
export const getGroupsStatus = state => state.groups.status;
export const getGroupsError = state => state.groups.error;
export const getButtonHighlight = state => state.groups.buttonHighlight;

export const selectGroupById = (state, id) => state.groups.groups.find(e => e.id === id)

export default groupsSlice.reducer