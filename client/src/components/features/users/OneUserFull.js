import React, { useEffect } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom/';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserByID, fetchUsers } from './usersSlice';
import { switchButton } from '../navigation/buttonSlice';

function OneUserFull() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const oneUser = useSelector(state => selectUserByID(state, Number(params.userID)));

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(switchButton(0))
    }, [dispatch])

    function articles() {
        if (oneUser.articles.length > 0) {
            return oneUser.articles.map(e =>
                <div key={e.id}>
                    <NavLink to={`/articles/${e.id}`}>
                        <button className='articleButton'>{e.plant.name} <br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                    </NavLink>
                </div>
            )
        }
    }

    function plants() {
        if (oneUser.plants) {
            return oneUser.plants.map(e => {
                return (
                <NavLink className="homePlantBox" key={e.id} to={`/plants/${e.id}`}>
                    <div>
                        <p>{e.name}</p>
                        <img style={{"width": "200px"}} alt={e.name} src={e.image} />
                    </div>
                </NavLink>
                
            )
        })}
    }

    return (
        <div className='oneUserCard userCard'>
            <div className='oneUserTitle'>
                <h3 className='userName'>{oneUser.name}'s Page</h3>
                <p>Climate: {oneUser.climate}</p>
                <p>Experience Level: {oneUser.experience_level}</p>
                <p>{oneUser.group ? `Group: ${oneUser.group.name}` : ""}</p>
            </div>
            <div className='userPlants'>
                <h4>Plants:</h4>
                <div className='userPlantTiles'>
                    {plants()}
                </div>
            </div>
            <div className='userArticles'>
                <h4>Guides:</h4>
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