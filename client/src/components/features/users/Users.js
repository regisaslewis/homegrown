import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneUser from "./OneUser";

import { fetchUsers, selectAllUsers, getUsersStatus, getUsersError } from "./usersSlice";
import { switchButton } from "../navigation/buttonSlice";

function Users() {

    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError)

    useEffect(() => {
        dispatch(switchButton(4))   
        dispatch(fetchUsers())
    }, [dispatch])

    let items;
    if (usersStatus === "loading") {
        items = <p>Loading Users</p>
    } else if (usersStatus === "succeeded") {
        items = allUsers.map(e => <OneUser key={e.id} userItem={e}/>)
    } else if (usersStatus === "failed") {
        items = <p>{error}</p>
    }

    return (
        <div>
            <h2 className="viewName usersPage">Users!</h2>
            <div id="usersContainer">
                {items}
            </div>
        </div>
    )
}

export default Users;