import React from "react";
import { NavLink } from "react-router-dom";

function OnePlant({plantItem}) {

    const { name, family, description, image } = plantItem
    
    return (
        <div title={`Click for more on ${name}`}>
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