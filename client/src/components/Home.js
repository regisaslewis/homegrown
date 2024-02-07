import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import OneGroup from "./features/groups/OneGroup";
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
        if (currentUser.liked_articles.length) {
            const userLikes = currentUser.liked_articles.map(e => e.id);
            const likeArray = allArticles.filter(e => userLikes.includes(e.id));
            const shownLikes = likeArray.map(e => <div  key={e.id}>
                <NavLink to={`/articles/${e.id}`}>
                    <button className="articleButton">{e.plant.name} <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
            return (
                <div className="likeBox">
                    <h4 id="likeTitle">Liked Articles</h4>
                    <div id="cuLikes">
                        {shownLikes}
                    </div>
                </div>
            )
        }
    }

    function userDislikedArticles() {
        if (currentUser.disliked_articles.length) {
            const userDislikes = currentUser.disliked_articles.map(e => e.id);
            const dislikeArray = allArticles.filter(e => userDislikes.includes(e.id));
            const shownDislikes = dislikeArray.map(e => <div  key={e.id}>
                <NavLink to={`/articles/${e.id}`}>
                    <button className="articleButton">{e.plant.name} <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
            return (
                <div className="likeBox">
                    <h4 id="dislikeTitle">Disliked Articles</h4>
                    <div id="cuDislikes">
                        {shownDislikes}
                    </div>
                </div>
            )
        }
    }

    function currentUserGroup() {
        if (currentUser.group) {
            return <div>
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
            <div id="homeContent">
                <div id="homeGroup">
                    {currentUserGroup()}
                </div>
                <div id= "homePlants" className="userPlants">
                    <div>Your Plants:</div>
                    <div className="userPlantTiles">{userPlants.length ? userPlants : "None"}</div>
                    <div id="homeAddPlants">{userPlants.length ? 
                        <NavLink to="/plants"><button>Add More</button></NavLink> : 
                        <NavLink to="/plants"><button>Get Some</button></NavLink>}
                    </div>
                </div>
                <div>
                    {userLikedArticles()}
                </div>
                <div>
                    {userDislikedArticles()}
                </div>
            </div>
        </div>
    )
}

export default Home;