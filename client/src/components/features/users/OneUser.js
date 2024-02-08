import React from "react";
import { NavLink } from "react-router-dom/";

function OneUser({userItem}) {

    const { id, name, group, plants } = userItem

    const userPlants = plants.map(e => <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}><p>{e.name}<br /><img style={{"width": "50px"}} alt={e.name} src={e.image} /></p></NavLink>)

    return (
        <div className="userCard">
            <div className="userTitle">
                <div className="userName">{name}</div>
                <div>{group ? `member of` : ""}</div>
                <div className="userGroup">{group ? group.name : ""}</div>
            </div>
            <div className="userPlants">
                <div>Proud caretaker of:</div>
                <br />
                <div className="userPlantTiles">{plants.length ? userPlants : "none"}</div>
            </div>            
            <br />
            <div className="userButton">
                <NavLink to={`/users/${id}`}>
                    <button>Go to {name}'s Page</button>
                </NavLink>
            </div>
        </div>
    )
}

export default OneUser;