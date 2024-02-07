import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OnePlantFamily from "./OnePlantFamily";
import NewPlantFamilyForm from "../forms/NewPlantFamilyForm";

import { fetchPlantFamilies, selectAllPlantFamilies, getPlantFamiliesStatus, getPlantFamiliesError, setFormVisibility, getFormVisibility } from "./plantFamiliesSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function PlantFamilies() {

    const dispatch = useDispatch();
    const allPlantFamilies = useSelector(selectAllPlantFamilies);
    const plantFamiliesStatus = useSelector(getPlantFamiliesStatus);
    const error = useSelector(getPlantFamiliesError)
    const formVisibility = useSelector(getFormVisibility)
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {
        dispatch(switchButton(7))
    }, [dispatch])

    useEffect(() => {
        if (plantFamiliesStatus === "idle") {
            dispatch(fetchPlantFamilies())
        }
    }, [plantFamiliesStatus, dispatch])

    let items;
    if (plantFamiliesStatus === "loading") {
        items = <p>Loading PlantFamilies</p>
    } else if (plantFamiliesStatus === "succeeded") {
        items = allPlantFamilies.map(e => <OnePlantFamily key={e.id} plantFamilyItem={e} />)
    } else if (plantFamiliesStatus === "failed") {
        items = <p>{error}</p>
    }

    function newPFButton() {
        if (currentUser.name) {
            if (!formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility(true))}>Add New Plant Family</button>
            }
        } else {
            return <NavLink to="/greet">
            <p className="or">Log in to add Plant Families</p>
            </NavLink>
        }
    }

    function cancelButton() {
        if (currentUser.name) {
            if (formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility(false))}>Cancel</button>
            }
        }
    }

    return (
        <div>
            <h2 className="viewName pfPage">Plant<br />Families!</h2>
            <div className="newItemButton">{newPFButton()}</div>
            {currentUser.name ?
            <div className="formContainer" style={formVisibility ? {"display": "block"} : {"display" : "none"}}>
                    <NewPlantFamilyForm />
                    <div className="cancelBut">{cancelButton()}</div>
            </div> : 
            ""}
            <div style={formVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                <div id="pfList">{items}</div>
            </div> 
        </div>
    )
}

export default PlantFamilies;