import React from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom/';
import { useSelector } from 'react-redux';

import { selectUserByID } from './usersSlice';

function OneUserFull() {

    const history = useHistory();
    const params = useParams();
    const oneUser = useSelector(state => selectUserByID(state, Number(params.userID)));

    function articles() {
        if (oneUser.articles.length > 0) {
            return oneUser.articles.map(e =>
                <div key={e.id}>
                    <NavLink to={`/articles/${e.id}`}>
                        <button>{e.plant.name} <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                    </NavLink>
                </div>
            )
        }
    }

    function plants() {
        if (oneUser.plants.length > 0) {
            return oneUser.plants.map(e => {
                return ( <div>
                    <p key={e.id}>{e.name}</p>
                    <img style={{"width": "200px"}} key={e.id} alt={e.name} src={e.image} />
                </div>
            )
        })}
    }

    return (
        <div className='oneUserCard userCard'>
            <div className='oneUserTitle'>
                <h3 className='userName'>{oneUser.name}'s Page</h3>
                <p>Climate: {oneUser.climate}</p>
                <p>Experience Level: {oneUser.experience_level}</p>
            </div>
            <div className='userPlants'>
                <h4>Plants:</h4>
                <div className='userPlantTiles'>
                    {plants()}
                </div>
            </div>
            <div className='userArticles'>
                <h4>Articles:</h4>
                <div className='userArticleTiles'>{articles()}</div>
            </div>            
            <br />
            <div className='userButton'>
                <button onClick={() => history.goBack()}>Return</button>
            </div>
            
        </div>
    )
}

export default OneUserFull;