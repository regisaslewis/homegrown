import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import NewPlantForm from "../forms/NewPlantForm";
import OnePlant from "./OnePlant";

import { fetchPlants, selectAllPlants, getPlantsStatus, getPlantsError, getFormVisibility, setFormVisibility } from "./plantsSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Plants() {

    const dispatch = useDispatch();
    const allPlants = useSelector(selectAllPlants);
    const plantsStatus = useSelector(getPlantsStatus);
    const error = useSelector(getPlantsError)
    const formVisibility = useSelector(getFormVisibility)
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {
        dispatch(switchButton(6))
    }, [dispatch])

    useEffect(() => {
        if (plantsStatus === "idle") {
            dispatch(fetchPlants())
        }
    }, [plantsStatus, dispatch])

    let items;
    if (plantsStatus === "loading") {
        items = <p>Loading Plants</p>
    } else if (plantsStatus === "succeeded") {
        items = allPlants.map(e => <OnePlant key={e.id} plantItem={e} />)
    } else if (plantsStatus === "failed") {
        items = <p>{error}</p>
    }

    function newPlantButton() {
        if (currentUser.name) {
            if (!formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility(true))}>Add New Plant</button>
            }
        } else {
            return <NavLink to="greet">
            <p className="or">Log in to add Plant</p>
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
            <h2 className="viewName plantsPage">Plants!</h2>
            {newPlantButton()}
            {currentUser.name ?
            <div className="formContainer" style={formVisibility ? {"display": "block"} : {"display" : "none"}}>
                    <NewPlantForm />
                    <div className="cancelBut">{cancelButton()}</div>
            </div> : 
            ""}
            <div style={formVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                <div id="plantsList">{items}</div>
            </div>
        </div>
    )
}

export default Plants;