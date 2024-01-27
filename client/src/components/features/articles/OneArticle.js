import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

    useEffect(() => {
        if (currentUser.liked_articles.find(e => e.id === article.id)) {
            setLiked(1)
        } else if (currentUser.disliked_articles.find(e => e.id === article.id)) {
            setLiked(2)
        } else {
            setLiked(0)
        }
    }, [article.id, currentUser.disliked_articles, currentUser.liked_articles])

    function handleClick(num) {
        dispatch(setEditFormVisibility(num))
    }
    function handleCancel() {
        dispatch(setEditFormVisibility(0));
    }

    function handleLike() {
        if (liked !== 1) {
            const user_id = currentUser.id
            const article_id = article.id
            if (currentUser.disliked_articles.find(e => e.id === article.id)) {
                let dislikeMinus = article.dislikes -1
                dispatch(editArticle({id: article.id, dislikes: dislikeMinus})) 
            }
            let likesPlus = article.likes + 1
            dispatch(editArticle({id: article.id, likes: likesPlus}))
            dispatch(likeArticle({user_id, article_id}))
            dispatch(removeDislike({user_id, article_id}))
            setLiked(1)
        } else {
            setLiked(0)
        }
    }

    function handleDislike() {
        if (liked !== 2) {
            const user_id = currentUser.id
            const article_id = article.id
            if (currentUser.liked_articles.find(e => e.id === article.id)) {
                let likeMinus = article.likes -1
                dispatch(editArticle({id: article.id, likes: likeMinus})) 
            }
            let dislikesPlus = article.dislikes + 1
            dispatch(editArticle({id: article.id, dislikes: dislikesPlus}))
            dispatch(dislikeArticle({user_id, article_id}))
            dispatch(removeLike({user_id, article_id}))
            setLiked(2)
        } else {
            setLiked(0)
        }
    }
    
    return (
        <div>
            <div>
                <p>user: {article.user.name}</p>
                <p>plant: {article.plant.name}</p>
                <p>success rating: {article.success_rating}/5</p>
                <p>body: {article.body}</p>
                <p>likes: {article.likes}</p>
                <p>dislikes: {article.dislikes}</p>
            </div>
            {editFormVisibility !== id ?
            <button onClick={() => handleClick(id)}>Edit Article</button> :
            <button onClick={() => handleCancel()}>Cancel</button>
            }
            <div style={editFormVisibility === id ? {"display" : "block"} : {"display" : "none"}}>
                <EditArticleForm articleItem={articleItem} />
            </div>
            {article.user.name !== currentUser.name ?
            <div>
                <button onClick={() => handleLike()} disabled={liked === 1 ? true : false}>Like</button>                
                <button onClick={() => handleDislike()} disabled={liked === 2 ? true: false}>Dislike</button>
            </div>:
            ""}
            <p>__________________________</p>
            
        </div>
    )
}

export default OneArticle