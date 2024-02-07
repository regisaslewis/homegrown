import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUser, addPlant } from "../users/currentUserSlice";
import { linkUser } from "./plantsSlice";

function OnePlant({plantItem}) {

    const { name, family, description, image } = plantItem
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)

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
            <NavLink to={`/plants/${plantItem.id}`}>
                <div className="plantCard">
                    <div className="plantCardContentsMini">
                        <div className="plantTitleMini">
                            {name}
                        </div>
                        <div className="plantDesc">
                            {description}
                        </div>
                        <div className="plantFamily">
                            Family:
                            <br />
                            {family.name}
                        </div>
                        <div className="groupJoinButton">
                            {plantButton()}
                        </div>
                    </div>
                    <div>
                        <img className="plantImage" alt={name} src={image} />
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default OnePlant;