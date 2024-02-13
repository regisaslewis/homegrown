import React from "react";
import { NavLink } from "react-router-dom/";

function OneUser({userItem}) {

    const { id, name, group, plants } = userItem

    const userPlants = () => {
        if (plants.length < 4) {
            return plants.map(e => <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}><p>{e.name}<br /><img style={{"width": "50px"}} alt={e.name} src={e.image} /></p></NavLink>)
        } else if (plants.length >= 4) {
            const shortenedList = plants.map(e => <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}><p>{e.name}<br /><img style={{"width": "50px"}} alt={e.name} src={e.image} /></p></NavLink>).slice(0, 3);
            return shortenedList;
        } else {
            return "none"
        }
    }

    return (
        <div className="userCard">
            <div className="userTitle">
                <div className="userName"><NavLink to={`/users/${id}`}>{name}</NavLink></div>
                <div>{group ? `member of` : ""}</div>
                <div className="userGroup">{group ? group.name : ""}</div>
            </div>
            <div className="userPlants">
                <div>Proud caretaker of:</div>
                <br />
                <div className="userPlantTiles">{userPlants()}</div>
                <div className="morePlants">{plants.length < 4 ? "" : <NavLink to={`/users/${id}`}>more plants on {name}'s page</NavLink>}</div>
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