import React from "react";
import { NavLink } from "react-router-dom/";
import { useSelector } from "react-redux";
import { getCurrentUser } from "./currentUserSlice"

function OneUser({userItem}) {

    const { id, name, group, plants } = userItem

    const currentUser = useSelector(getCurrentUser)

    const userPlants = () => {
        if (plants.length < 6) {
            return plants.map(e => <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}><p>{e.name}<br /><img style={{"width": "50px"}} alt={e.name} src={e.image} /></p></NavLink>)
        } else if (plants.length >= 6) {
            const shortenedList = plants.map(e => <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}><p>{e.name}<br /><img style={{"width": "50px"}} alt={e.name} src={e.image} /></p></NavLink>).slice(0, 5);
            return shortenedList;
        } else {
            return "none"
        }
    }

    return (
        <div className="userCard">
            <div className="userTitle">
                <div className="userName"><NavLink to={`/users/${id}`}>{currentUser.name !== name ? name : <div title="this is YOU" className="your">{name}</div>}</NavLink></div>
                <div>{group ? `member of` : ""}</div>
                <div className="userGroup">{group ? group.name : ""}</div>
            </div>
            <div className="userPlants">
                <div>Proud caretaker of {plants.length} varieties: </div>
                <br />
                <div className="userPlantTiles">{userPlants()}</div>
                <div className="morePlants" title={`click here for ${name}'s page`}>{plants.length < 6 ? "" : <NavLink to={`/users/${id}`}>more plants on {currentUser.name !== name ? `${name}'s` : "your"} page</NavLink>}</div>
            </div>
            <br />
            <div className="userButton">
                <NavLink to={`/users/${id}`}>
                    <button>Go to {currentUser.name !== name ? `${name}'s` : "your"} Page</button>
                </NavLink>
            </div>
        </div>
    )
}

export default OneUser;