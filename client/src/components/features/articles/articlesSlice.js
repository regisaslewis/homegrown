import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    newFormVisibility: false,
    editFormVisibility: 0,
    buttonHighlight: 1,
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
            console.log(response.data)
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
        setNewFormVisibility: (state, action) => {
            state.newFormVisibility = action.payload
        },
        setEditFormVisibility: (state, action) => {
            state.editFormVisibility = action.payload
        },
        highlightButton: (state, action) => {
            state.buttonHighlight = action.payload;
        },
        sortNormal: (state) => {
            state.articles.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                } else if (a.id > b.id) {
                    return 1
                }
                return 0;
            })
        },
        sortByLikes: (state) => {
            let sortedArticles = state.articles.sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1
                } else if (a.likes < b.likes) {
                    return 1
                }
                
                return 0;
            })
            state.articles = sortedArticles
        },
        sortByDislikes: (state) => {
            let sortedArticles = state.articles.sort((a, b) => {
                if (a.dislikes < b.dislikes) {
                    return -1
                } else if (a.dislikes > b.dislikes) {
                    return 1
                }
                
                return 0;
            })
            state.articles = sortedArticles
        },
        sortByUserName: (state) => {
            let sortedArticles = state.articles.sort((a, b) => {
                if (a.user.name < b.user.name) {
                    return -1
                } else if (a.user.name > b.user.name) {
                    return 1
                }
                
                return 0;
            })
            state.articles = sortedArticles
        },
        sortByPlantName: (state) => {
            let sortedArticles = state.articles.sort((a, b) => {
                if (a.plant.name < b.plant.name) {
                    return -1
                } else if (a.plant.name > b.plant.name) {
                    return 1
                }
                
                return 0;
            })
            state.articles = sortedArticles
        },
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
        })
        .addCase(deleteArticle.fulfilled, (state, action) => {
            const { id } = action.payload;
            const articles = state.articles.filter(e => e.id !== id);
            state.articles = articles
        })
    }
})

export const { 
    setNewFormVisibility, 
    setEditFormVisibility,
    highlightButton, 
    sortNormal, 
    sortByLikes, 
    sortByDislikes,
    sortByUserName,
    sortByPlantName } = articlesSlice.actions;

export const getNewFormVisibility = state => state.articles.newFormVisibility;
export const getEditFormVisibility = state => state.articles.editFormVisibility;
export const getButtonHighlight = state => state.articles.buttonHighlight;
export const selectAllArticles = state => state.articles.articles;
export const getArticlesStatus = state => state.articles.status;
export const getArticlesError = state => state.articles.error;

export const selectArticleById = (state, id) => state.articles.articles.find(e => e.id === id) 

export default articlesSlice.reducer