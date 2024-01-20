import React from "react";

function OneArticle({articleItem}) {

    const { plant, user, success_rating, body } = articleItem
    

    return (
        <div>
            <p>user: {user.name}</p>
            <p>plant: {plant.name}</p>
            <p>success rating: {success_rating}/5</p>
            <p>body: {body}</p>
            <p>__________________________</p>
        </div>
    )
}

export default OneArticle