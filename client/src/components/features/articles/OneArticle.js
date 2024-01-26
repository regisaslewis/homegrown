import React from "react";
import { useSelector } from "react-redux";
import { selectArticleById } from "./articlesSlice";

import EditArticleForm from "../forms/EditArticleForm";

function OneArticle({articleItem}) {

    const { id } = articleItem;
    const article = useSelector(state => selectArticleById(state, Number(id)))
    
    return (
        <div>
            <div>
                <p>user: {article.user.name}</p>
                <p>plant: {article.plant.name}</p>
                <p>success rating: {article.success_rating}/5</p>
                <p>body: {article.body}</p>
                <p>likes: {article.likes}</p>
            </div>
            <div>
                <EditArticleForm articleItem={articleItem} />
                <p>__________________________</p>
            </div>   
        </div>
    )
}

export default OneArticle