import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles, selectAllArticles, getArticlesStatus, getArticlesError } from "./articlesSlice";
import OneArticle from "./OneArticle";

function Articles() {

    const dispatch = useDispatch();
    const allArticles = useSelector(selectAllArticles);
    const articlesStatus = useSelector(getArticlesStatus);
    const error = useSelector(getArticlesError)

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
            {items}
        </div>
    )
}

export default Articles;