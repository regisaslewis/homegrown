import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneArticle from "./OneArticle";

import { fetchArticles, selectAllArticles, getArticlesStatus, getArticlesError, setNewFormVisibility, getNewFormVisibility } from "./articlesSlice";
import NewArticleForm from "../forms/NewArticleForm";
import { switchButton } from "../navigation/buttonSlice";

function Articles() {

    const dispatch = useDispatch();
    const allArticles = useSelector(selectAllArticles);
    const articlesStatus = useSelector(getArticlesStatus);
    const error = useSelector(getArticlesError)
    const newFormVisibility = useSelector(getNewFormVisibility)
    
    useEffect(() => {
        dispatch(switchButton(8))
    }, [dispatch])

    useEffect(() => {
        if (articlesStatus === "idle") {
            dispatch(fetchArticles())
        }
    }, [articlesStatus, dispatch])

    let items;
    if (articlesStatus === "loading") {
        items = <p>Loading Articles</p>
    } else if (articlesStatus === "succeeded") {
        items = allArticles.map(e => <OneArticle key={e.id} articleItem={e} />)
    } else if (articlesStatus === "failed") {
        items = <p>{error}</p>
    }

    return (
        <div>
            <h2>Articles Page</h2>
            <button onClick={() => dispatch(setNewFormVisibility())}>{newFormVisibility ? "Cancel" : "Add New Article" }</button>
            <div style={newFormVisibility ? {"display": "block"} : {"display" : "none"}}>
                <NewArticleForm />
            </div>
            <div style={newFormVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                {items}
            </div> 
        </div>
    )
}

export default Articles;