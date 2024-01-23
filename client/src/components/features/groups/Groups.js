import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneGroup from "./OneGroup";
import NewGroupForm from "../forms/NewGroupForm";

import { fetchGroups, selectAllGroups, getGroupsStatus, getGroupsError } from "./groupsSlice";
import { switchButton } from "../navigation/buttonSlice";

function Groups() {

    const dispatch = useDispatch();
    const allGroups = useSelector(selectAllGroups);
    const groupsStatus = useSelector(getGroupsStatus);
    const error = useSelector(getGroupsError)
    
    useEffect(() => {
        dispatch(switchButton(5))
    }, [dispatch])

    useEffect(() => {
        if (groupsStatus === "idle") {
            dispatch(fetchGroups())
        }
    }, [groupsStatus, dispatch])

    let items;
    if (groupsStatus === "loading") {
        items = <p>Loading Groups</p>
    } else if (groupsStatus === "succeeded") {
        items = allGroups.map(e => <OneGroup key={e.id} groupItem={e} />)
    } else if (groupsStatus === "failed") {
        items = <p>{error}</p>
    }

    return (
        <div>
            <h2>Groups Page</h2>
            <NewGroupForm />
            {items}
        </div>
    )
}

export default Groups;