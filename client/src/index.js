import { Provider } from "react-redux";
import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom/";

import { store } from "./store";
import { fetchUsers } from "./components/features/users/usersSlice";
import { fetchGroups } from "./components/features/groups/groupsSlice";
import { fetchPlants } from "./components/features/plants/plantsSlice";
import { fetchPlantFamilies } from "./components/features/plant_families/plantFamiliesSlice";
import { fetchArticles } from "./components/features/articles/articlesSlice";
import { checkSession } from "./components/features/users/currentUserSlice";

function dispatchAll() {
    store.dispatch(fetchGroups());
    setTimeout(() => {
    store.dispatch(checkSession());
    store.dispatch(fetchArticles());
    store.dispatch(fetchUsers());
    store.dispatch(fetchPlants());
    store.dispatch(fetchPlantFamilies());
    }, 100)
}

dispatchAll();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);