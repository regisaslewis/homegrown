import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllArticles } from "./features/articles/articlesSlice";
import { getCurrentUser } from "./features/users/currentUserSlice";
import { switchButton } from "./features/navigation/buttonSlice";


function Home() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const allArticles = useSelector(selectAllArticles)
    const userConditional = Object.keys(currentUser).length > 0 ? currentUser.name : ""
    const userLikedArticles = currentUser.liked_articles.map(e => {
        const thisArticle = allArticles.filter(x => x.id === e.id)[0]
        return <p key={e.id}>Concerning {thisArticle.plant.name}, {thisArticle.user.name} writes:<br />{e.body}</p>
    });
    const userDislikedArticles = currentUser.disliked_articles.map(e => {
        const thisArticle = allArticles.filter(x => x.id === e.id)[0]
        return <p key={e.id}>Concerning {thisArticle.plant.name}, {thisArticle.user.name} writes:<br /> {e.body}</p>
    });
    // const userDislikeArticles = currentUser.disliked_articles.map(e => <p key={e.id}>{e.body}</p>)
    const userPlants = currentUser.plants.map(e => <p key={e.id}>{e.name}</p>)

    console.log()

    useEffect(() => {
        dispatch(switchButton(1))
    }, [dispatch])

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Current User = {userConditional}</h4>
            <p>_____________</p>
            {userConditional}'s Plants: {userPlants}
            <p>_____________</p>
            Liked Articles:
            <br />{userConditional ?  userLikedArticles : ""}
            <p>_____________</p>
            Disliked Articles:
            <br />{userConditional ? userDislikedArticles : ""}
        </div>
    )
}

export default Home;