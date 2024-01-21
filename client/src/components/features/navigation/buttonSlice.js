import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buttonNum: 0
}

export const buttonSlice = createSlice({
    name: "button",
    initialState,
    reducers: {
        switchButton: (state, action) => {
            state.buttonNum = action.payload;
        }
    }
})

export const { switchButton } = buttonSlice.actions;

export default buttonSlice.reducer;