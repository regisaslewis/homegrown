import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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
            return <div>
                <h4>{userConditional}'s Group:</h4>
                <OneGroup groupItem={currentUser.group} />
            </div>
        }
    }

    const userPlants = currentUser.plants.map(e => <div key={e.id}>
            <p>{e.name}</p>
            <br />
            <img style={{"width": "80px"}} alt={e.name} src={e.image} />            
        </div>)

    return (
        <div>
            <h2>Welcome, {userConditional}</h2>
            <div id="homeGroup">
                {currentUserGroup()}
            </div>
            <div id= "homePlants" className="userPlants">
                <div>Your Plants:</div>
                <div className="userPlantTiles">{userPlants.length ? userPlants : "None"}</div>
                <div id="homeAddPlants">{userPlants.length ? <NavLink to="/plants"><button>Add More</button></NavLink> : <NavLink to="/plants"><button>Get Some</button></NavLink>}</div>
            </div>
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