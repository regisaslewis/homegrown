import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "./components/features/navigation/buttonSlice";
import usersReducer from "./components/features/users/usersSlice";
import plantsReducer from "./components/features/plants/plantsSlice";
import groupsReducer from "./components/features/groups/groupsSlice";
import plantFamiliesReducer from "./components/features/plant_families/plantFamiliesSlice"
import articlesReducer from "./components/features/articles/articlesSlice";
import currentUserReducer from "./components/features/users/currentUserSlice";

export const store = configureStore({
    reducer: {
        button: buttonReducer,
        users: usersReducer,
        plants: plantsReducer,
        groups: groupsReducer,
        plantFamilies: plantFamiliesReducer,
        articles: articlesReducer,
        currentUser: currentUserReducer,
    }
})