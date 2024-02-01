import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
                return <button onClick={() => dispatch(setFormVisibility())}>Add New Plant</button>
            }
        } else {
            return <p>Log in to add Plant Families</p>
        }
    }

    function cancelButton() {
        if (currentUser.name) {
            if (formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility())}>Cancel</button>
            }
        }
    }

    return (
        <div>
            <h2>Plants Page</h2>
            {newPlantButton()}
            {currentUser.name ?
            <div className="form" style={formVisibility ? {"display": "block"} : {"display" : "none"}}>
                    <NewPlantForm />
                    {cancelButton()}
            </div> : 
            ""}
            <div style={formVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                {items}
            </div>
        </div>
    )
}

export default Plants;