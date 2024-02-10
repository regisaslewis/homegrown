import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OneArticle from "./OneArticle";

import { fetchArticles, selectAllArticles, getArticlesStatus, getArticlesError, setNewFormVisibility, getNewFormVisibility, setEditFormVisibility } from "./articlesSlice";
import NewArticleForm from "../forms/NewArticleForm";
import { switchButton } from "../navigation/buttonSlice";
import { checkSession, getCurrentUser } from "../users/currentUserSlice";

function Articles() {

    const dispatch = useDispatch();
    const allArticles = useSelector(selectAllArticles);
    const articlesStatus = useSelector(getArticlesStatus);
    const error = useSelector(getArticlesError)
    const newFormVisibility = useSelector(getNewFormVisibility)
    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(switchButton(8))
    }, [dispatch])

    useEffect(() => {
        if (articlesStatus === "idle") {
            dispatch(fetchArticles())
        }
    }, [articlesStatus, dispatch])

    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch, currentUser.name])

    let items;
    if (articlesStatus === "loading") {
        items = <p>Loading Articles</p>
    } else if (articlesStatus === "succeeded") {
        items = allArticles.map(e => <OneArticle key={`article${e.id}`} articleItem={e} />)
    } else if (articlesStatus === "failed") {
        items = <p>{error}</p>
    }

    function newArticleButton() {
        if (currentUser.name) {
            if (!newFormVisibility) {
                return <button onClick={() => {dispatch(setNewFormVisibility(true)); dispatch(setEditFormVisibility(0))}}>Add New Guide</button>
            }
        } else {
            return <NavLink to="/greet">
                <p className="or">Log in to add Guides</p>
                </NavLink>
        }
    }

    function cancelButton() {
        if (currentUser.name) {
            if (newFormVisibility) {
                return <button onClick={() => dispatch(setNewFormVisibility(false))}>Cancel</button>
            }
        }
    }

    return (
        <div>
            <h2 className="viewName articlesPage">Guides!</h2>
                <div className="newItemButton">{newArticleButton()}</div>
                {currentUser.name ?
                <div className="formContainer" style={newFormVisibility ? {"display": "block"} : {"display" : "none"}}>
                    <NewArticleForm />
                    <div className="cancelBut">{cancelButton()}</div>
                </div> : 
                ""}
            <div id="articleList" style={newFormVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                {items}
            </div> 
        </div>
    )
}

export default Articles;