import React  from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addCurrentUser, selectGroupById, fetchGroups } from "./groupsSlice";
import { getCurrentUser, changeGroup } from "../users/currentUserSlice";
import { selectAllUsers } from "../users/usersSlice";

function OneGroup({groupItem}) {

    const { id } = groupItem;
    const dispatch = useDispatch();
    const history = useHistory();
    const group = useSelector(state => selectGroupById(state, Number(id)))
    const currentUser = useSelector(getCurrentUser);
    const allUsers = useSelector(selectAllUsers)

    const groupCreator = allUsers.find(e => e.name === group.group_creator)

    function usersList() {
        if (group.users.length > 0) {
            return group.users.map(e => 
            <NavLink key={e.id} to={`/users/${e.id}`}>
                <p className="groupMembers">{e.name}</p>
            </NavLink>)
        }
        return <p>None yet!</p>
    }

    function handleJoin() {
        dispatch(addCurrentUser(group))
        dispatch(changeGroup(group))
        dispatch(fetchGroups())
        history.push("/")
    }

    function joinVisibility() {
        if (!currentUser.group || (currentUser.group && currentUser.group.id !== group.id)) {
            return <button className="joinButton" onClick={() => handleJoin()}>Join</button>
        }
    }

    return (
        <div className="groupCard">
            <div className="groupTitle">
                {group.name}
            </div>
            <div className="groupContents">
                Created By: 
                <div className="groupCreator">
                    <NavLink to={`/users/${groupCreator.id}`}>
                        {group.group_creator}
                    </NavLink>    
                </div>
                <p className="groupDesc">{group.description}</p>
            </div>
            <div className="groupList">
                Members:
                {usersList()}
            </div>
            <div className="groupJoinButton">
                {joinVisibility()}
            </div>
        </div>
    )
}

export default OneGroup;