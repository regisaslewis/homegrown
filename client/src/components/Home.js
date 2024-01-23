import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUser } from "./features/users/currentUserSlice";
import { switchButton } from "./features/navigation/buttonSlice";


function Home() {

    const dispatch = useDispatch();
    const loggedUser = useSelector(getCurrentUser);
    const userConditional = Object.keys(loggedUser).length > 0 ? loggedUser.name : ""

    useEffect(() => {
        dispatch(switchButton(1))
    }, [dispatch])

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Current User = {userConditional}</h4>
        </div>
    )
}

export default Home;