import React from "react";

function OneGroup({groupItem}) {

    const { name, description, users, group_creator } = groupItem

    const usersList = users.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <p>name: {name}</p>
            <p>description: {description}</p>
            <p>group creator: {group_creator}</p>
            users: {usersList}
            <p>__________________________</p>
        </div>
    )
}

export default OneGroup