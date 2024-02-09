import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectArticleById, getEditFormVisibility, setEditFormVisibility, editArticle } from "./articlesSlice";
import { getCurrentUser, likeArticle, dislikeArticle, removeLike, removeDislike } from "../users/currentUserSlice";

import EditArticleForm from "../forms/EditArticleForm";

function OneArticle({articleItem}) {

    const { id } = articleItem;
    const dispatch = useDispatch();
    const article = useSelector(state => selectArticleById(state, Number(id)))
    const editFormVisibility = useSelector(getEditFormVisibility)
    const currentUser = useSelector(getCurrentUser)
    const [liked, setLiked] = useState(0)
    const user_id = currentUser.id
    const article_id = article.id

    useEffect(() => {
        if (currentUser.name) {
            if (currentUser.liked_articles.find(e => e.id === article.id)) {
                setLiked(1)
            } else if (currentUser.disliked_articles.find(e => e.id === article.id)) {
                setLiked(2)
            } else {
                setLiked(0)
            }
        }
    }, [article.id, currentUser.name, currentUser.disliked_articles, currentUser.liked_articles])

    function handleClick(num) {
        dispatch(setEditFormVisibility(num))
    }

    function handleCancel() {
        dispatch(setEditFormVisibility(0));
    }

    function handleLike() {
        if (liked !== 1) {
            if (currentUser.disliked_articles.find(e => e.id === article.id)) {
                let dislikesMinus = article.dislikes - 1
                dispatch(editArticle({id: article.id, dislikes: dislikesMinus})) 
            }
            let likesPlus = article.likes + 1
            dispatch(editArticle({id: article.id, likes: likesPlus}))
            dispatch(removeDislike({user_id, article_id}))
            dispatch(likeArticle({user_id, article_id}))
        } else {
            setLiked(0)
        }
    }

    function handleDislike() {
        if (liked !== 2) {
            const user_id = currentUser.id
            const article_id = article.id
            if (currentUser.liked_articles.find(e => e.id === article.id)) {
                let likesMinus = article.likes - 1
                dispatch(editArticle({id: article.id, likes: likesMinus})) 
            }
            let dislikesPlus = article.dislikes + 1
            dispatch(editArticle({id: article.id, dislikes: dislikesPlus}))
            dispatch(removeLike({user_id, article_id}))
            dispatch(dislikeArticle({user_id, article_id}))
        } else {
            setLiked(0)
        }
    }

    function allowVote() {
        if (currentUser.name) {
            if (article.user.name !== currentUser.name) {
                return (
                    <div className="voteButtons">
                        <button onClick={() => handleLike()} disabled={liked === 1 ? true : false}>Like</button>                
                        <button onClick={() => handleDislike()} disabled={liked === 2 ? true: false}>Dislike</button>
                    </div>
                )
            } else {
                return ""
            }
        } else {
            return (
                <p>Log in to vote</p>
            )
        }
    }

    const displayOn = {
        display: "block",
    }
    
    let image;

    if (article.plant.image) {
        image = article.plant.image
    } else {
        image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }
    
    return (
        <div className="articleCard">
            <div className="articleTitle" style={editFormVisibility !== 0 ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                <NavLink to={`/users/${article.user_id}`}>{currentUser.name === article.user.name ? <div className="your">Your</div> : `${article.user.name}'s`} </NavLink>Care Guide
                <br />
                for <NavLink to={`/plants/${article.plant_id}`}>{article.plant.name}</NavLink>
            </div>
            <div className="articleContents" style={editFormVisibility !== 0 ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                <div className="articleDetails">
                    <p>success rating: {article.success_rating}/5</p>
                    <NavLink to={`/plants/${article.plant_id}`}>
                        <img className="articleImage" alt={article.plant.name} src={image} />
                    </NavLink>
                </div>
                <p className="articleBody">{article.body}</p>
                <p>likes: {article.likes}</p>
                <p>dislikes: {article.dislikes}</p>
            </div>
            <div className="editOrVote">
                {article.user_id === currentUser.id ?
                    <div className="articleEditButton">
                        {editFormVisibility !== id ?
                        <button onClick={() => handleClick(id)}>Edit Guide</button> :
                        <button onClick={() => handleCancel()}>Cancel</button>
                        }
                    </div>:
                ""}
                <div style={editFormVisibility === id ? displayOn : {"display" : "none"}}>
                    <EditArticleForm articleItem={articleItem} />
                </div>
                <div>{allowVote()}</div>
            </div>
        </div>
    )
}

export default OneArticle