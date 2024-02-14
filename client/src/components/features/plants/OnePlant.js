import React from "react";
import { NavLink } from "react-router-dom";

function OnePlant({plantItem}) {

    const { name, family, description } = plantItem;

    let image;

    if (plantItem.image) {
        image = plantItem.image
    } else {
        image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }
    
    return (
        <div>
            <div className="plantCard" title={`Click for more on ${name}`}>
                <NavLink to={`/plants/${plantItem.id}`}>
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
                </NavLink>
                <div title={`Click for more on ${name}`}>
                    <NavLink to={`/plants/${plantItem.id}`}>
                        <img className="plantImage" alt={name} src={image} />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default OnePlant;