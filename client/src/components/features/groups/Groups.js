import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OneGroup from "./OneGroup";
import NewGroupForm from "../forms/NewGroupForm";

import { 
    selectAllGroups,
    getGroupsStatus, 
    getGroupsError, 
    getFormVisibility, 
    setFormVisibility,
    getButtonHighlight,
    highlightButton,
    sortNormal,
    sortName,
    sortMembers,
    sortNewest } from "./groupsSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Groups() {

    const dispatch = useDispatch();
    const allGroups = useSelector(selectAllGroups);
    const groupsStatus = useSelector(getGroupsStatus);
    const error = useSelector(getGroupsError)
    const formVisibility = useSelector(getFormVisibility)
    const highlit = useSelector(getButtonHighlight)
    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(switchButton(5))
        dispatch(highlightButton(1))
    }, [dispatch])

    let items;
    if (groupsStatus === "loading") {
        items = allGroups.map(e => <OneGroup key={e.id} groupItem={e} />)
    } else if (groupsStatus === "succeeded") {
        items = allGroups.map(e => <OneGroup key={e.id} groupItem={e} />)
    } else if (groupsStatus === "failed") {
        items = <p>{error}</p>
    }

    function newGroupButton() {
        if (currentUser.name) {
            if (!formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility(true))}>Add New Group</button>
            }
        } else {
            return <NavLink to="/greet">
                <p className="or">Log in to add Group</p>
                </NavLink>
        }
    }

    function cancelButton() {
        if (currentUser.name) {
            if (formVisibility) {
                return <button onClick={() => dispatch(setFormVisibility(false))}>Cancel</button>
            }
        }
    }

    function normalSort() {
        dispatch(sortNormal())
        dispatch(highlightButton(1))
    }

    function nameSort() {
        dispatch(sortName())
        dispatch(highlightButton(2))
    }

    function memberSort() {
        dispatch(sortMembers())
        dispatch(highlightButton(3))
    }

    function newSort() {
        dispatch(sortNewest())
        dispatch(highlightButton(4))
    }

    return (
        <div>
            <h2 className="viewName groupsPage">Groups!</h2>
            <div className="pageButtons plantPBs">
                <div className="newItemButton">{newGroupButton()}</div>
                <div className="sortButtons">
                    <button className={highlit === 1 ? "deadButton" : "livingButton"} onClick={() => normalSort()}>Normal Order</button>
                    <button className={highlit === 2 ? "deadButton" : "livingButton"} onClick={() => nameSort()}>Group Name</button>
                    <button className={highlit === 3 ? "deadButton" : "livingButton"} onClick={() => memberSort()} style={{width: "max-content"}}>Most Members</button>
                    <button className={highlit === 4 ? "deadButton" : "livingButton"} onClick={() => newSort()}>Newest</button>
                </div>
            </div>
            {currentUser.name ?
            <div className="formContainer" style={formVisibility ? {"display": "block"} : {"display" : "none"}}>
                    <NewGroupForm />
                    <div className="cancelBut">{cancelButton()}</div>
            </div> : 
            ""}
            <div id="groups" style={formVisibility ? {"filter": "blur(0.8px)"} : {"filter" : "blur(0)"}}>
                {items}
            </div>
        </div>
    )
}

export default Groups;