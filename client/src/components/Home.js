import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import OneGroup from "./features/groups/OneGroup";
import OneArticle from "./features/articles/OneArticle";
import { getCurrentUser } from "./features/users/currentUserSlice";
import { fetchArticles, selectAllArticles } from "./features/articles/articlesSlice";
import { switchButton } from "./features/navigation/buttonSlice";


function Home() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const allArticles = useSelector(selectAllArticles)
    const userConditional = Object.keys(currentUser).length > 0 ? currentUser.name : "";

    useEffect(() => {
        dispatch(switchButton(1));
        dispatch(fetchArticles());
    }, [dispatch])

    function userLikedArticles() {
        if (currentUser.liked_articles) {
            const userLikes = currentUser.liked_articles.map(e => e.id);
            const likeArray = allArticles.filter(e => userLikes.includes(e.id));
            return likeArray.map(e => <OneArticle key={e.id} articleItem={e} />)
        }
    }

    function userDislikedArticles() {
        if (currentUser.disliked_articles) {
            const userDislikes = currentUser.disliked_articles.map(e => e.id);
            const dislikeArray = allArticles.filter(e => userDislikes.includes(e.id));
            return dislikeArray.map(e => <OneArticle key={e.id} articleItem={e} />)
        }
    }

    function currentUserGroup() {
        if (currentUser.group) {
            return <OneGroup groupItem={currentUser.group} />
        }
    }

    const userPlants = currentUser.plants.map(e => <p key={e.id}>{e.name}</p>)

    return (
        <div>
            <h2>Home Page</h2>
            <h4>{userConditional}'s Group:</h4>
            {currentUserGroup()}
            {userConditional}'s Plants: {userPlants}
            <p>_____________</p>
            Liked Articles:
            <br />
            {userLikedArticles()}
            <p>_____________</p>
            Disliked Articles:
            <br />
            {userDislikedArticles()}
        </div>
    )
}

export default Home;