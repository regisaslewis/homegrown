import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUser, addPlant } from "../users/currentUserSlice";
import { linkUser } from "./plantsSlice";

function OnePlant({plantItem}) {

    const { name, family, description, articles, image } = plantItem
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)

    function plantArtcles() {
        if (articles && articles.length > 0) {
            return articles.map(e => <p key={e.id}>-------<br />User: {e.user.name}<br /> Success Rating: {e.success_rating}/5<br /> Body: {e.body}</p>)
        } else {
            return "No Articles."
        }
    }

    function handleAdd() {
        dispatch(linkUser(plantItem))
        dispatch(addPlant(plantItem))
    }
    
    function plantButton() {
        if (currentUser.name ) {
        const userPlantNames = currentUser.plants.map(e => e.name)
        const userHasPlant = userPlantNames.includes(name)
            if (!userHasPlant) {
                return <button onClick={() => handleAdd()}>Add Plant</button>
            }
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
            {plantButton()}
            <p>____________________</p>
        </div>
    )
}

export default OnePlant;