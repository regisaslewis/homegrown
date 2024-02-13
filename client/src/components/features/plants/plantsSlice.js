import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    plants: [],
    formVisibility: false,
    buttonHightlight: 1,
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

export const addNewPlant = createAsyncThunk(
    "plants/addNewPlant",
    async (initialInfo) => {
        try {
            const response = await axios.post(PLANTS_URL, initialInfo);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

export const linkUser = createAsyncThunk(
    "plants/linkUser",
    async (initialInfo) => {
        const { id } = initialInfo
        try {
            const response = await axios.post(`${PLANTS_URL}/${id}`, initialInfo);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

const plantsSlice = createSlice({
    name: "plants",
    initialState,
    reducers: {
        setFormVisibility: (state, action) => {
            state.formVisibility = action.payload
        },
        highlightButton: (state, action) => {
            state.buttonHightlight = action.payload
        },
        sortNormal: (state) => {
            state.plants.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0
            })
        },
        sortName: (state) => {
            state.plants.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                } else if (a.name > b.name) {
                    return 1
                }
                return 0
            })
        },
        sortFamily: (state) => {
            state.plants.sort((a, b) => {
                if (a.family.name < b.family.name) {
                    return -1
                } else if (a.family.name > b.family.name) {
                    return 1
                }
                return 0
            })
        }
    },
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
        .addCase(addNewPlant.fulfilled, (state, action) => {
            state.plants.push(action.payload[0])
        })
        .addCase(linkUser.fulfilled, (state, action) => {
            const { id } = action.payload[0]
            const plants = state.plants.filter(e => e.id !== id)
            state.plants = [...plants, action.payload[0]]
            state.plants.sort((a, b) => {
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

export const { setFormVisibility, highlightButton, sortNormal, sortName, sortFamily } = plantsSlice.actions;

export const getFormVisibility = state => state.plants.formVisibility;
export const selectAllPlants = state => state.plants.plants;
export const getPlantsStatus = state => state.plants.status;
export const getPlantsError = state => state.plants.error;
export const getButtonHighlight = state => state.plants.buttonHightlight;

export const selectPlantByID = (state, id) => state.plants.plants.find(e => e.id === id)

export default plantsSlice.reducer