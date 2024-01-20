import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlantFamilies, selectAllPlantFamilies, getPlantFamiliesStatus, getPlantFamiliesError } from "./plantFamiliesSlice";
import OnePlantFamily from "./OnePlantFamily";

function PlantFamilies() {

    const dispatch = useDispatch();
    const allPlantFamilies = useSelector(selectAllPlantFamilies);
    const plantFamiliesStatus = useSelector(getPlantFamiliesStatus);
    const error = useSelector(getPlantFamiliesError)

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

    return (
        <div>
            <h2>PlantFamilies Page</h2>
            {items}
        </div>
    )
}

export default PlantFamilies;