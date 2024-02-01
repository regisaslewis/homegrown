import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    plantFamilies: [],
    formVisibility: false,
    status: "idle",
    error: null
}

const PLANT_FAMILIES_URL = "/plant_families"

export const fetchPlantFamilies = createAsyncThunk(
    "plantFamilies/fetchPlantFamilies",
    async () => {
        try {
            const response = await axios.get(PLANT_FAMILIES_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    } 
)

export const addNewPlantFamily = createAsyncThunk(
    "plantFamilies/addNewPlantFamily",
    async (initialInfo) => {
        try {
            const response = await axios.post(PLANT_FAMILIES_URL, initialInfo)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

const plantFamiliesSlice = createSlice({
    name: "plantFamilies",
    initialState,
    reducers: {
        setFormVisibility: (state) => {
            state.formVisibility = !state.formVisibility
        }
    },
    extraReducers (builder) {
        builder
        .addCase(fetchPlantFamilies.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchPlantFamilies.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.plantFamilies = action.payload;
        })
        .addCase(fetchPlantFamilies.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(addNewPlantFamily.fulfilled, (state, action) => {
            state.plantFamilies.push(action.payload[0])
        })
    }
})

export const { setFormVisibility } = plantFamiliesSlice.actions;

export const getFormVisibility = state => state.plantFamilies.formVisibility;
export const selectAllPlantFamilies = state => state.plantFamilies.plantFamilies;
export const getPlantFamiliesStatus = state => state.plantFamilies.status;
export const getPlantFamiliesError = state => state.plantFamilies.error;

export default plantFamiliesSlice.reducer