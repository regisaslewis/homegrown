import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    plants: [],
    status: "idle",
    error: null
}

const PLANTS_URL = "/plants"

export const fetchPlants = createAsyncThunk(
    "plants/fetchPlants",
    async () => {
        try {
            const response = await axios.get(PLANTS_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    } 
)

const plantsSlice = createSlice({
    name: "plants",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(fetchPlants.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchPlants.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.plants = action.payload;
        })
        .addCase(fetchPlants.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const selectAllPlants = state => state.plants.plants;
export const getPlantsStatus = state => state.plants.status;
export const getPlantsError = state => state.plants.error;

export default plantsSlice.reducer