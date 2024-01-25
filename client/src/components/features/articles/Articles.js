import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneArticle from "./OneArticle";

import { fetchArticles, selectAllArticles, getArticlesStatus, getArticlesError } from "./articlesSlice";
import NewArticleForm from "../forms/NewArticleForm";
import { switchButton } from "../navigation/buttonSlice";

function Articles() {

    const dispatch = useDispatch();
    const allArticles = useSelector(selectAllArticles);
    const articlesStatus = useSelector(getArticlesStatus);
    const error = useSelector(getArticlesError)
    const [formVisibility, setFormVisibilty] = useState(false)
    
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

    function handleVisibility() {
        setFormVisibilty(!formVisibility)
    }

    return (
        <div>
            <h2>Articles Page</h2>
            <button onClick={handleVisibility}>{formVisibility ? "Cancel" : "Add New Article" }</button>
            <div style={formVisibility ? {"display": "block"} : {"display" : "none"}}>
                <NewArticleForm />
            </div>
            <div style={formVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                {items}
            </div> 
        </div>
    )
}

export default Articles;