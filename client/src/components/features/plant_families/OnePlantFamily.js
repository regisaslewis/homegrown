import React from "react";
import { NavLink } from "react-router-dom";

function OnePlantFamily({plantFamilyItem}) {

    const { name, description, plants } = plantFamilyItem

    function plantFamilyPlants() {
        if (plants.length > 0) {
            return plants.map(e => 
            <NavLink key={e.id} to={`/plants/${e.id}`}>
                <div className="pfPlantLink">{e.name}</div>
            </NavLink>)
        } else {
            return "None yet"
        }
    }

    let image;

    if (plantFamilyItem.image) {
        image = plantFamilyItem.image
    } else {
        image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }

    const backgroundStyling = {
        backgroundImage: `url(${image})`,
        backgroundSize: "100%",
        backgroundBlendMode: "multiply"
    }

    return (
        <div className="pfCard" style={backgroundStyling}>
            <div className="pfContents">
                <div className="pfTitle">{name}</div>
                <div className="pfDesc">{description}</div>
                <div className="pfPlants">
                    <div>Plants:</div>
                    {plantFamilyPlants()}
                </div>
            </div>
        </div>
    )
}

export default OnePlantFamily;