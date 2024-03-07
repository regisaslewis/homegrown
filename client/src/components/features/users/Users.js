import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OneUser from "./OneUser";

import {
    fetchUsers,
    selectAllUsers,
    getUsersStatus, 
    getUsersError,
    getButtonHightlight,
    highlightButton,
    sortNormal,
    sortPlants,
    sortArticles } from "./usersSlice";
import { switchButton } from "../navigation/buttonSlice";

function Users() {

    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError)
    const highlit = useSelector(getButtonHightlight)

    useEffect(() => {
        dispatch(switchButton(4))   
        dispatch(fetchUsers())
        dispatch(highlightButton(1))
    }, [dispatch])

    let items;
    if (usersStatus === "loading") {
        items = allUsers.map(e => <OneUser key={e.id} userItem={e}/>)
    } else if (usersStatus === "succeeded") {
        items = allUsers.map(e => <OneUser key={e.id} userItem={e}/>)
    } else if (usersStatus === "failed") {
        items = <p>{error}</p>
    }

    function normalSort() {
        dispatch(sortNormal())
        dispatch(highlightButton(1))
    }

    function plantSort() {
        dispatch(sortPlants())
        dispatch(highlightButton(2))
    }

    function articleSort() {
        dispatch(sortArticles())
        dispatch(highlightButton(3))
    }

    return (
        <div>
            <div className="pageButtons plantPBs">
                <div className="newItemButton"></div>
                <div className="sortButtons">
                    <button className={highlit === 1 ? "deadButton" : "livingButton"} onClick={() => normalSort()}>Normal Order</button>
                    <button className={highlit === 2 ? "deadButton" : "livingButton"} onClick={() => plantSort()}>Most Plants</button>
                    <button className={highlit === 3 ? "deadButton" : "livingButton"} onClick={() => articleSort()}>Most Guides</button>
                </div>
            </div>
            <div id="usersContainer">
                {items}
            </div>
        </div>
    )
}

export default Users;