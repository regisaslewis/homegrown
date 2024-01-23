import React from "react";

function OneUser({userItem}) {

    const { name, articles, group, plants, climate, experience_level } = userItem

    const userPlants = plants.map(e => <p key={e.id}>{e.name}<br />------</p>)
    const userArticles = articles.map(e => <p key={e.id}>------<br />Plant: {e.plant.name}<br/>Success Rating: {e.success_rating}/5<br />Body: {e.body}</p>)

    return (
        <div>
            <p>name: {name}</p>
            <p>group: {group ? group.name : "none"}</p>
            <p>climate: {climate}</p>
            <p>experience level: {experience_level}</p>
            plants: {plants.length ? userPlants : "none"}
            <br />
            articles: {articles.length ? userArticles : "none"}
            <p>__________________________</p>
        </div>
    )
}

export default OneUser;