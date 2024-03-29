import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addCurrentUser, selectGroupById, fetchGroups, highlightButton } from "./groupsSlice";
import { getCurrentUser, changeGroup } from "../users/currentUserSlice";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";

function OneGroup({groupItem}) {

    const { id } = groupItem;
    const dispatch = useDispatch();
    const group = useSelector(state => selectGroupById(state, Number(id)))
    const currentUser = useSelector(getCurrentUser);
    const allUsers = useSelector(selectAllUsers)

    const groupCreator = () => allUsers.find(e => e.name === group.group_creator)

    function usersList() {
        if (group.users.length > 0) {
            return group.users.map(e => 
            <NavLink key={e.id} to={`/users/${e.id}`}>
                {e.name === currentUser.name ? <p className="cuName groupMembers">{e.name}</p> : <p className="groupMembers">{e.name}</p>}
            </NavLink>)
        }
        return <p>None yet!</p>
    }

    let image;

    if (group.image) {
        image = group.image
    } else {
        image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
    }
    

    function handleJoin() {
        dispatch(highlightButton(1))
        dispatch(addCurrentUser(group))
        dispatch(changeGroup(group))
        setTimeout(() => {
            dispatch(fetchGroups())
            dispatch(fetchUsers())
        }, 500)
    }

    function joinVisibility() {
        if (!currentUser.group || (currentUser.group && currentUser.group.id !== group.id)) {
            return <button className="joinButton" onClick={() => handleJoin()}>Join</button>
        }
    }

    const backgroundStyling = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply"
    }

    return (
        <div className="groupCard" style={backgroundStyling}>
            <div className="groupInner">
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
        </div>
    )
}

export default OneGroup;