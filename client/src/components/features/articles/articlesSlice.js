import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    articles: [],
    status: "idle",
    error: null
}

const ARTICLES_URL = "/articles"

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async () => {
        try {
            const response = await axios.get(ARTICLES_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    } 
)

export const addNewArticle = createAsyncThunk(
    "articles/addNewArticle",
    async (initialInfo) => {
        try {
            const response = await axios.post(ARTICLES_URL, initialInfo)
            return response.data
        } catch (err) {
            return err.message;
        }
    }
)

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(fetchArticles.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.articles = action.payload;
        })
        .addCase(fetchArticles.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(addNewArticle.fulfilled, (state, action) => {
            state.articles.push(action.payload)
        })
    }
})

export const selectAllArticles = state => state.articles.articles;
export const getArticlesStatus = state => state.articles.status;
export const getArticlesError = state => state.articles.error;

export default articlesSlice.reducer