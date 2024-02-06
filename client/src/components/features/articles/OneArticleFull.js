import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { selectArticleById, getEditFormVisibility, setEditFormVisibility, editArticle } from "./articlesSlice";
import { getCurrentUser, likeArticle, dislikeArticle, removeLike, removeDislike } from "../users/currentUserSlice";

import EditArticleForm from "../forms/EditArticleForm";

function OneArticleFull() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const article = useSelector(state => selectArticleById(state, Number(params.articleID)))
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

    function currentUserArticle() {
        if (article.user_id === currentUser.id) {
            return (
                <div className="articleEditButton">
                    {editFormVisibility !== params.articleID ?
                    <button onClick={() => handleClick(params.articleID)}>Edit Article</button> :
                    <button onClick={() => handleCancel()}>Cancel</button>
                    }
                </div>
            )
        }
    }
    
    return (
        <div className="articleCard">
            <div className="articleTitle">
                {article.user.name}'s Care Guide
                <br />
                for {article.plant.name}
            </div>
            <div className="articleContents">
                <p>success rating: {article.success_rating}/5</p>
                <p className="articleBody">{article.body}</p>
                <p>likes: {article.likes}</p>
                <p>dislikes: {article.dislikes}</p>
            </div>
            <div className="editOrVote">
                <div>
                    {currentUserArticle()}
                    <div style={editFormVisibility === params.articleID ? {"display" : "block"} : {"display" : "none"}}>
                        <EditArticleForm articleItem={article} />
                    </div>
                </div>
                <div >
                    {allowVote()}
                </div>
            </div>
            <div className="returnButton">
                <button onClick={() => history.goBack()}>Return</button>
            </div>
        </div>
    )
}

export default OneArticleFull;