import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectArticleById, getEditFormVisibility, setEditFormVisibility } from "./articlesSlice";

import EditArticleForm from "../forms/EditArticleForm";

function OneArticle({articleItem}) {

    const { id } = articleItem;
    const article = useSelector(state => selectArticleById(state, Number(id)))
    const dispatch = useDispatch();
    const editFormVisibility = useSelector(getEditFormVisibility)

    function handleClick(num) {
        dispatch(setEditFormVisibility(num))
}
    function handleCancel() {
        dispatch(setEditFormVisibility(0));
    }
    
    return (
        <div>
            <div>
                <p>user: {article.user.name}</p>
                <p>plant: {article.plant.name}</p>
                <p>success rating: {article.success_rating}/5</p>
                <p>body: {article.body}</p>
                <p>likes: {article.likes}</p>
            </div>
            {editFormVisibility !== id ?
            <button onClick={() => handleClick(id)}>Edit Article</button> :
            <button onClick={() => handleCancel()}>Cancel</button>
            }
            <div style={editFormVisibility === id ? {"display" : "block"} : {"display" : "none"}}>
                <EditArticleForm articleItem={articleItem} />
                <p>__________________________</p>
            </div>   
        </div>
    )
}

export default OneArticle