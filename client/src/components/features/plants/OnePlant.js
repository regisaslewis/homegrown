import React from "react";

function OnePlant({plantItem}) {

    const { name, family, description, articles, image } = plantItem
    function plantArtcles() {
        if (articles && articles.length > 0) {
            return articles.map(e => <p key={e.id}>-------<br />User: {e.user.name}<br /> Success Rating: {e.success_rating}/5<br /> Body: {e.body}</p>)
        } else {
            return "No Articles."
        }
    }

    return (
        <div>
            <p>name: {name}</p>
            <p>family: {family.name}</p>
            <p>description: {description}</p>
            image = <img alt={name} src={image} style={{"maxWidth": "50px"}} />
            <br />
            articles: {plantArtcles()}
            <p>____________________</p>
        </div>
    )
}

export default OnePlant;