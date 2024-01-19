import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "../src/components/features/buttonSlice";

export const store = configureStore({
    reducer: {
        button: buttonReducer,
    }
})