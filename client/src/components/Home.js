import React from "react";
import { useSelector } from "react-redux";

import { getCurrentUser } from "./features/users/currentUserSlice";


function Home() {

const loggedUser = useSelector(getCurrentUser)
const userConditional = Object.keys(loggedUser).length > 0 ? loggedUser.name : ""

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Current User = {userConditional}</h4>
        </div>
    )
}

export default Home;