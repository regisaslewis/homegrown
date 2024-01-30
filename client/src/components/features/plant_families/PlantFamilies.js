import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OnePlantFamily from "./OnePlantFamily";
import NewPlantFamilyForm from "../forms/NewPlantFamilyForm";

import { fetchPlantFamilies, selectAllPlantFamilies, getPlantFamiliesStatus, getPlantFamiliesError } from "./plantFamiliesSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function PlantFamilies() {

    const dispatch = useDispatch();
    const allPlantFamilies = useSelector(selectAllPlantFamilies);
    const plantFamiliesStatus = useSelector(getPlantFamiliesStatus);
    const error = useSelector(getPlantFamiliesError)
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

    return (
        <div>
            <h2>PlantFamilies Page</h2>
            {currentUser.name ? 
                <NewPlantFamilyForm /> :
                <p>Log in to add new plant family</p>
            }
            {items}
        </div>
    )
}

export default PlantFamilies;