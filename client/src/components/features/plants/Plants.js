import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewPlantForm from "../forms/NewPlantForm";
import OnePlant from "./OnePlant";

import { fetchPlants, selectAllPlants, getPlantsStatus, getPlantsError } from "./plantsSlice";
import { switchButton } from "../navigation/buttonSlice";

function Plants() {

    const dispatch = useDispatch();
    const allPlants = useSelector(selectAllPlants);
    const plantsStatus = useSelector(getPlantsStatus);
    const error = useSelector(getPlantsError)

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
            <NewPlantForm />
            {items}
        </div>
    )
}

export default Plants;