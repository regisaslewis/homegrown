import React from "react";

function OnePlant({plantItem}) {

    const { name, family, description, articles } = plantItem
    const plantArticles = articles.map(e => <p key={e.id}>-------<br />User: {e.user.name}<br /> Success Rating: {e.success_rating}/5<br /> Body: {e.body}</p>)

    return (
        <div>
            <p>name: {name}</p>
            <p>family: {family.name}</p>
            <p>description: {description}</p>
            articles: {plantArticles}
            <p>____________________</p>
        </div>
    )
}

export default OnePlant