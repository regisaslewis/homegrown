import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUser } from "./features/users/currentUserSlice";
import { switchButton } from "./features/navigation/buttonSlice";


function Home() {

    const dispatch = useDispatch();
    const loggedUser = useSelector(getCurrentUser);
    const userConditional = Object.keys(loggedUser).length > 0 ? loggedUser.name : ""
    const userLikedArticles = loggedUser.liked_articles.map(e => <p key={e.id}>{e.body}</p>);
    const userDislikeArticles = loggedUser.disliked_articles.map(e => <p key={e.id}>{e.body}</p>)

    useEffect(() => {
        dispatch(switchButton(1))
    }, [dispatch])

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Current User = {userConditional}</h4>
            Liked Articles:
            <br />{userConditional ?  userLikedArticles : ""}
            Disliked Articles:
            <br />{userConditional ? userDislikeArticles : ""}
        </div>
    )
}

export default Home;