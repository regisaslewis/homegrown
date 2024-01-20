import React from "react";

function OnePlantFamily({plantFamilyItem}) {

    const { name, description, plants } = plantFamilyItem
    
    const plantFamilyPlants = plants.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <p>name: {name}</p>
            <p>description: {description}</p>
            plants: {plantFamilyPlants}
            <p>__________________________</p>
        </div>
    )
}

export default OnePlantFamily