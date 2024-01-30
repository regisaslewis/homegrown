import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewPlantForm from "../forms/NewPlantForm";
import OnePlant from "./OnePlant";

import { fetchPlants, selectAllPlants, getPlantsStatus, getPlantsError } from "./plantsSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Plants() {

    const dispatch = useDispatch();
    const allPlants = useSelector(selectAllPlants);
    const plantsStatus = useSelector(getPlantsStatus);
    const error = useSelector(getPlantsError)
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

    return (
        <div>
            <h2>Plants Page</h2>
            {currentUser.name ?
                <NewPlantForm /> :
                <p>Log in to add new plant</p>
            }
            {items}
        </div>
    )
}

export default Plants;