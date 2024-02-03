import React  from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addCurrentUser, selectGroupById, fetchGroups } from "./groupsSlice";
import { getCurrentUser, changeGroup } from "../users/currentUserSlice";

function OneGroup({groupItem}) {

    const { id } = groupItem;
    const currentUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const group = useSelector(state => selectGroupById(state, Number(id)))

    function usersList() {
        if (group.users.length > 0) {
            return group.users.map(e => <p key={e.id}>{e.name}</p>)
        }
    }

    function handleJoin() {
        dispatch(addCurrentUser(group))
        dispatch(changeGroup(group))
        dispatch(fetchGroups())
        history.push("/")
    }

    function joinVisibility() {
        if (currentUser.group && currentUser.group.id !== group.id) {
            return <button onClick={() => handleJoin()}>Join</button>
        }
    }

    return (
        <div>
            <p>name: {group.name}</p>
            <p>description: {group.description}</p>
            <p>group creator: {group.group_creator}</p>
            users: {usersList()}
            {joinVisibility()}
            <p>__________________________</p>
        </div>
    )
}

export default OneGroup;