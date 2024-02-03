import React from "react";
import { NavLink } from "react-router-dom/";

function OneUser({userItem}) {

    const { id, name, group, plants } = userItem

    const userPlants = plants.map(e => <p key={e.id}>{e.name}<br /><img style={{"width": "40px"}} alt={e.name} src={e.image} /></p>)

    return (
        <div className="userCard">
            <div className="userTitle">
                <div className="userName">{name}</div>
                <div>{group ? `member of` : ""}</div>
                <div className="userGroup">{group ? group.name : ""}</div>
            </div>
            <div className="userPlants">
                <div>Proud caretaker of:</div>
                <div className="userPlantTiles">{plants.length ? userPlants : "none"}</div>
            </div>            
            <br />
            <div className="userButton">
                <NavLink to={`/users/${id}`}>
                    <button>Go to User Page</button>
                </NavLink>
            </div>
        </div>
    )
}

export default OneUser;