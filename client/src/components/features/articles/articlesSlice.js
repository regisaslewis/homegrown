import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    newFormVisibility: false,
    editFormVisibility: 0,
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

export const editArticle = createAsyncThunk(
    "articles/editArticle",
    async (initialInfo) => {
        const { id } = initialInfo;
        try {
            const response = await axios.patch(`${ARTICLES_URL}/${id}`, initialInfo)
            return response.data
        } catch (err) {
            return err.message
        }
    }
)

export const deleteArticle = createAsyncThunk(
    "articles/deleteArticle",
    async (initialInfo) => {
        const { id } = initialInfo;
        try {
            const response = await axios.delete(`${ARTICLES_URL}/${id}`)
            if (response.status === 200) return initialInfo;
            console.log(response.status)
            return `${response.status}: ${response.statusText}`
        } catch (err) {
            return err.message;
        }
    }
)

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setNewFormVisibility: (state) => {
            state.newFormVisibility = !state.newFormVisibility
        },
        setEditFormVisibility: (state, action) => {
            state.editFormVisibility = action.payload
        }
    },
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
        .addCase(editArticle.fulfilled, (state, action) => {            
            const { id } = action.payload;
            const articles = state.articles.filter(e => e.id !== id);
            state.articles = [...articles, action.payload]
            state.articles.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0;
            })
        })
        .addCase(deleteArticle.fulfilled, (state, action) => {
            const { id } = action.payload;
            const articles = state.articles.filter(e => e.id !== id);
            state.articles = articles
        })
    }
})

export const { setNewFormVisibility, setEditFormVisibility } = articlesSlice.actions;

export const getNewFormVisibility = state => state.articles.newFormVisibility;
export const getEditFormVisibility = state => state.articles.editFormVisibility;
export const selectAllArticles = state => state.articles.articles;
export const getArticlesStatus = state => state.articles.status;
export const getArticlesError = state => state.articles.error;

export const selectArticleById = (state, id) => state.articles.articles.find(e => e.id === id) 

export default articlesSlice.reducer