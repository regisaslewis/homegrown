import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getCurrentUser } from "./features/users/currentUserSlice";
import { fetchArticles, selectAllArticles } from "./features/articles/articlesSlice";
import { fetchGroups, selectAllGroups } from "./features/groups/groupsSlice";
import { fetchUsers } from "./features/users/usersSlice";
import { switchButton } from "./features/navigation/buttonSlice";
import { selectAllUsers } from "./features/users/usersSlice";

function Home() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const allArticles = useSelector(selectAllArticles)
    const allUsers = useSelector(selectAllUsers)
    const allGroups = useSelector(selectAllGroups)

    useEffect(() => {
        dispatch(switchButton(1));
        dispatch(fetchArticles());
        dispatch(fetchGroups());
        dispatch(fetchUsers());
    }, [dispatch])

    function userLikedArticles() {
        let shownLikes = "none yet"
        if (currentUser.liked_articles.length) {
            const userLikes = currentUser.liked_articles.map(e => e.id);
            const likeArray = allArticles.filter(e => userLikes.includes(e.id));
            shownLikes = likeArray.map(e => <div  key={e.id}>
                <NavLink to={`/articles/${e.id}`}>
                    <button className="articleButton"><div className="articleButtonTitle">{e.plant.name} by {e.user.name}</div><br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
        }
        return (
                <div className="likeBox">
                    <h4 id="likeTitle">Liked Guides</h4>
                    <div id="cuLikes">
                        {shownLikes}
                    </div>
                </div>
            )
    }

    function userDislikedArticles() {
        let shownDislikes = "none yet"
        if (currentUser.disliked_articles.length) {
            const userDislikes = currentUser.disliked_articles.map(e => e.id);
            const dislikeArray = allArticles.filter(e => userDislikes.includes(e.id));
            shownDislikes = dislikeArray.map(e => <div  key={e.id}>
                <NavLink to={`/articles/${e.id}`}>
                    <button className="articleButton"><div className="articleButtonTitle">{e.plant.name} by {e.user.name}</div> <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
        }
        return (
                <div className="likeBox">
                    <h4 id="dislikeTitle">Disliked Guides</h4>
                    <div id="cuDislikes">
                        {shownDislikes}
                    </div>
                </div>
            )
    }    

    function userArticles() {
        if (currentUser.articles.length) {
            const articleList = () => currentUser.articles.map(e => {
                let image;

                if (e.plant.image) {
                    image = e.plant.image
                } else {
                    image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
                }
                return (
                <div key={e.id} className="homeArticleStack" style={{
                    "position" : "absolute",
                    "top" : `${10 + (20 * currentUser.articles.indexOf(e))}px`,
                    "left" : `${20 * currentUser.articles.indexOf(e)}px`,
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
            return articleList();
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
                if (currentUser.group.users) {
                    const cuGroupNames = currentUser.group.users.map(e => e.name)
                    if (cuGroupNames.includes(currentUser.name)) {
                        return currentUser.group.users.map(e => 
                        <NavLink key={e.id} to={`/users/${e.id}`}>
                            {e.name === currentUser.name ? <p className="cuName groupMembers">{e.name}</p> : <p className="groupMembers">{e.name}</p>}
                        </NavLink>)
                    } else {
                        return (
                            <div>
                                {currentUser.group.users.map(e => 
                                <NavLink key={e.id} to={`/users/${e.id}`}>
                                    <p className="groupMembers">{e.name}</p>
                                </NavLink>
                                )}
                                <NavLink key={currentUser.id} to={`/users/${currentUser.id}`}>
                                <p className="cuName groupMembers">{currentUser.name}</p>
                                </NavLink>
                            </div>
                        )
                    }
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
                        {usersList() ? usersList() : ""}
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
                        {userArticles() ? userArticles() : <NavLink to="/articles"><button className="or checkOut">Check out Guides</button></NavLink>}
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
                        <div>{currentUserGroup() ? "Your Group:" : ""}</div>
                        {currentUserGroup() ? currentUserGroup() : <NavLink to="/groups"><button className="or checkOut">Join a Group</button></NavLink>}
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