import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getCurrentUser } from "./features/users/currentUserSlice";
import { fetchArticles, selectAllArticles } from "./features/articles/articlesSlice";
import { switchButton } from "./features/navigation/buttonSlice";
import { selectAllUsers } from "./features/users/usersSlice";

function Home() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const allArticles = useSelector(selectAllArticles)
    const allUsers = useSelector(selectAllUsers)

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
                    <button className="articleButton"><div className="articleButtonTitle">{e.plant.name} by {e.user.name}</div><br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
            return (
                <div className="likeBox">
                    <h4 id="likeTitle">Liked Guides</h4>
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
                    <button className="articleButton"><div className="articleButtonTitle">{e.plant.name} by {e.user.name}</div> <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
            return (
                <div className="likeBox">
                    <h4 id="dislikeTitle">Disliked Guides</h4>
                    <div id="cuDislikes">
                        {shownDislikes}
                    </div>
                </div>
            )
        }
    }    

    function userArticles() {
        if (currentUser.articles.length) {
            const articleList = currentUser.articles.map(e => {
                let image;

                if (e.plant.image) {
                    image = e.plant.image
                } else {
                    image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
                }
                return (
                <div className="homeArticleStack" style={{
                    "position" : "absolute",
                    "top" : `${-5 * currentUser.articles.indexOf(e)}px`,
                    "left" : `${12 * currentUser.articles.indexOf(e)}px`,
                    "zIndex" : `${100 - currentUser.articles.indexOf(e)}`
                }}> 
                    <div className="articleTitle">
                        <NavLink to={`/users/${e.user_id}`}>
                            Your
                        </NavLink> Care Guide
                        <br />
                        for <NavLink to={`/plants/${e.plant_id}`}>
                            {e.plant.name}
                        </NavLink>
                    </div>
                    <div className="articleContents">
                        <div className="articleDetails">
                            <p>success rating: {e.success_rating}/5</p>
                            <NavLink to={`/plants/${e.plant_id}`}>
                                <img className="articleImage" alt={e.plant.name} src={image} />
                            </NavLink>
                        </div>
                        <p className="articleBody">{e.body}</p>
                        <div className="moreButton">
                            <NavLink to={`/articles/${e.id}`}>
                                <button>Click for More</button>
                            </NavLink>
                        </div>
                    </div>
                </div>)})
            return articleList;
        }
    }

    function currentUserGroup() {
        if (currentUser.group) {
            let image;
            if (currentUser.group.image) {
                image = currentUser.group.image
            } else {
                image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
            }
            const backgroundStyling = {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundBlendMode: "multiply"
            }
            function usersList() {
                if (currentUser.group.users.length > 0) {
                    return currentUser.group.users.map(e => 
                    <NavLink key={e.id} to={`/users/${e.id}`}>
                        {e.name === currentUser.name ? <p className="cuName groupMembers">{e.name}</p> : <p className="groupMembers">{e.name}</p>}
                    </NavLink>)
                }
            }
            const groupCreator = allUsers.find(e => e.name === currentUser.group.group_creator)
            return (
            <div className="groupCard" style={backgroundStyling}>
                <div className="groupInner">
                    <div className="groupTitle">
                        {currentUser.group.name}
                    </div>
                    <div className="groupContents">
                        Created By:
                        <div className="groupCreator">
                            <NavLink to={`/users/${groupCreator.id}`}>
                                {currentUser.group.group_creator}
                            </NavLink>
                        </div>
                        <p className="groupDesc">{currentUser.group.description}</p>
                    </div>
                    <div className="groupList">
                        Members:
                        {usersList()}
                    </div>
                </div>
            </div>)
        } else {
            <NavLink to="/groups">
                <button>Join One!</button>
            </NavLink>
        }
    }

    const userPlants = currentUser.plants.map(e => 
        <NavLink key={e.id} title="Click for more." to={`/plants/${e.id}`}>
            <div className="homePlantBox">
                <p>{e.name}</p>
                <br />
                <img style={{"width": "90px"}} alt={e.name} src={e.image} />            
            </div>
        </NavLink>)

    return (
        <div>
            <div id="homeContent">
                <div id="homeUpper">
                    <div id="homeArticles">
                        {userArticles()}
                    </div>
                    <div id="homePlants" className="userPlants">
                        <div>Your Plants:</div>
                        <br />
                        <div className="userPlantTiles">{userPlants.length ? userPlants : "None"}</div>
                        <div id="homeAddPlants">{userPlants.length ? 
                            <NavLink to="/plants"><button>Add More</button></NavLink> : 
                            <NavLink to="/plants"><button>Get Some</button></NavLink>}
                        </div>
                    </div>
                    <div id="homeGroup">
                        <div>Your Group:</div>
                        {currentUserGroup()}
                    </div>
                </div>
                <div id="homeLower">
                    <div>
                        {userLikedArticles()}
                    </div>
                    <div>
                        {userDislikedArticles()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;