import React from "react";

function OnePlantFamily({plantFamilyItem}) {

    const { name, description, plants, image } = plantFamilyItem

    function plantFamilyPlants() {
        if (plants.length > 0) {
            return plants.map(e => <p key={e.id}>{e.name}</p>)
        } else {
            return "None yet"
        }
    }

    return (
        <div>
            <p>name: {name}</p>
            <p>description: {description}</p>
            image: <img alt={name} src={image} style={{"maxWidth": "50px"}} />
            <br />
            plants: {plantFamilyPlants()}
            <p>__________________________</p>
        </div>
    )
}

export default OnePlantFamily