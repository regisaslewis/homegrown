import React, { useEffect } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom/';
import { useSelector, useDispatch } from 'react-redux';

import { selectPlantByID, fetchPlants } from './plantsSlice';
import { fetchUsers } from '../users/usersSlice';
import { switchButton } from '../navigation/buttonSlice';

function OnePlantFull() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const onePlant = useSelector(state => selectPlantByID(state, Number(params.plantID)))

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchPlants())
    }, [dispatch])
    console.log(onePlant)
    return (
        <div>
            {onePlant.name}
        </div>
    )
}

export default OnePlantFull;