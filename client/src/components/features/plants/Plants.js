import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants, selectAllPlants, getPlantsStatus, getPlantsError } from "./plantsSlice";
import OnePlant from "./OnePlant";

function Plants() {

    const dispatch = useDispatch();
    const allPlants = useSelector(selectAllPlants);
    const plantsStatus = useSelector(getPlantsStatus);
    const error = useSelector(getPlantsError)

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
            {items}
        </div>
    )
}

export default Plants;