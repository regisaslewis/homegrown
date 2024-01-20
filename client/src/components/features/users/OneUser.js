import React from "react";

function OneUser({userItem}) {

    const { name, articles, group, plants, climate, experience_level } = userItem

    const userPlants = plants.map(e => <p key={e.id}>{e.name}<br />------</p>)
    const userArticles = articles.map(e => <p key={e.id}>------<br />Plant: {e.plant.name}<br/>Success Rating: {e.success_rating}/5<br />Body: {e.body}</p>)

    return (
        <div>
            <p>name: {name}</p>
            <p>group: {group.name}</p>
            <p>climate: {climate}</p>
            <p>experience level: {experience_level}</p>
            plants: {userPlants}
            articles: {userArticles}
            <p>__________________________</p>
        </div>
    )
}

export default OneUser