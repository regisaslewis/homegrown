import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectAllUsers, getUsersStatus, getUsersError } from "./usersSlice";
import OneUser from "./OneUser";

function Users() {

    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError)

    useEffect(() => {
        if (usersStatus === "idle") {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

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
            <h2>Users Page</h2>
            {items}
        </div>
    )
}

export default Users;