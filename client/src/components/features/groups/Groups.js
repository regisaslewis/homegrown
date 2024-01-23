import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups, selectAllGroups, getGroupsStatus, getGroupsError } from "./groupsSlice";
import OneGroup from "./OneGroup";

function Groups() {

    const dispatch = useDispatch();
    const allGroups = useSelector(selectAllGroups);
    const groupsStatus = useSelector(getGroupsStatus);
    const error = useSelector(getGroupsError)

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
            {items}
        </div>
    )
}

export default Groups;