import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OneGroup from "./OneGroup";
import NewGroupForm from "../forms/NewGroupForm";

import { fetchGroups, selectAllGroups, getGroupsStatus, getGroupsError, getFormVisibility, setFormVisibility } from "./groupsSlice";
import { switchButton } from "../navigation/buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Groups() {

    const dispatch = useDispatch();
    const allGroups = useSelector(selectAllGroups);
    const groupsStatus = useSelector(getGroupsStatus);
    const error = useSelector(getGroupsError)
    const formVisibility = useSelector(getFormVisibility)
    const currentUser = useSelector(getCurrentUser)
    
    useEffect(() => {
        dispatch(switchButton(5))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchGroups())
    }, [ dispatch])

    let items;
    if (groupsStatus === "succeeded") {
        items = allGroups.map(e => <OneGroup key={e.id} groupItem={e} />
        )
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

    return (
        <div>
            <h2>Groups!</h2>
            <div id="newGroupButton">{newGroupButton()}</div>
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