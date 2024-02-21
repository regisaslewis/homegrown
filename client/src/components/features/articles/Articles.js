import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OneArticle from "./OneArticle";

import { 
    fetchArticles, 
    selectAllArticles, 
    getArticlesStatus, 
    getArticlesError, 
    setNewFormVisibility, 
    getNewFormVisibility, 
    setEditFormVisibility,
    getButtonHighlight,
    highlightButton,
    sortNormal, 
    sortByLikes,
    sortByDislikes,
    sortByUserName,
    sortByPlantName } from "./articlesSlice";
import NewArticleForm from "../forms/NewArticleForm";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Articles() {

    const dispatch = useDispatch();
    const allArticles = useSelector(selectAllArticles);
    const articlesStatus = useSelector(getArticlesStatus);
    const highlitButton = useSelector(getButtonHighlight)
    const error = useSelector(getArticlesError)
    const newFormVisibility = useSelector(getNewFormVisibility)
    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(switchButton(8));
        dispatch(sortNormal());
        dispatch(highlightButton(1));
    }, [dispatch])

    useEffect(() => {
        if (articlesStatus === "idle") {
            dispatch(fetchArticles())
        }
    }, [articlesStatus, dispatch])

    let items;
    if (articlesStatus === "loading") {
        items = allArticles.map(e => <OneArticle key={`article${e.id}`} articleItem={e} />)
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

    function normalSort() {
        dispatch(sortNormal())
        dispatch(highlightButton(1))
    }

    function likesSort() {
        dispatch(sortByLikes())
        dispatch(highlightButton(2))
    }

    function dislikesSort() {
        dispatch(sortByDislikes())
        dispatch(highlightButton(3))
    }

    function userSort() {
        dispatch(sortByUserName())
        dispatch(highlightButton(4))
    }

    function plantSort() {
        dispatch(sortByPlantName())
        dispatch(highlightButton(5))
    }

    return (
        <div>
            <h2 className="viewName articlesPage">Guides!</h2>
                <div className="pageButtons" style={newFormVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                    <div className="newItemButton">{newArticleButton()}</div>
                    <div className="sortButtons">
                        <button className={highlitButton === 1 ? "deadButton" : "livingButton"} onClick={() => normalSort()}>Normal Order</button>
                        <button className={highlitButton === 2 ? "deadButton" : "livingButton"} onClick={() => likesSort()}>Most Likes</button>
                        <button className={highlitButton === 3 ? "deadButton" : "livingButton"} onClick={() => dislikesSort()} style={{width: "max-content"}}>Fewest Dislikes</button>
                        <button className={highlitButton === 4 ? "deadButton" : "livingButton"} onClick={() => userSort()}>User Name</button>
                        <button className={highlitButton === 5 ? "deadButton" : "livingButton"} onClick={() => plantSort()}>Plant Name</button>
                    </div>
                </div>
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