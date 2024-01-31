import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneGroup from "./OneGroup";
import NewGroupForm from "../forms/NewGroupForm";

import { fetchGroups, selectAllGroups, getGroupsStatus, getGroupsError } from "./groupsSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Groups() {

    const dispatch = useDispatch();
    const allGroups = useSelector(selectAllGroups);
    const groupsStatus = useSelector(getGroupsStatus);
    const error = useSelector(getGroupsError)
    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(switchButton(5))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchGroups())
    }, [ dispatch])

    let items;
    if (groupsStatus === "succeeded") {
        items = allGroups.map(e => <OneGroup key={e.id} groupItem={e} />)
    } else if (groupsStatus === "failed") {
        items = <p>{error}</p>
    }

    return (
        <div>
            <h2>Groups Page</h2>
            {currentUser.name ? 
                <NewGroupForm /> : 
                <p>Log in to add a Group</p>
            }
            {items}
        </div>
    )
}

export default Groups;