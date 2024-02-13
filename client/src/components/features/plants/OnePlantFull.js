import React, { useEffect } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom/';
import { useSelector, useDispatch } from 'react-redux';

import { selectPlantByID, fetchPlants, linkUser } from './plantsSlice';
import { getCurrentUser } from '../users/currentUserSlice';
import { fetchUsers } from '../users/usersSlice';
import { switchButton } from '../navigation/buttonSlice';
import { addPlant } from '../users/currentUserSlice';


function OnePlantFull() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const currentUser = useSelector(getCurrentUser)
    const onePlant = useSelector(state => selectPlantByID(state, Number(params.plantID)))

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchPlants())
        dispatch(switchButton(3))
    }, [dispatch])

    function plantUsers() {
        if (onePlant.users.length) {
            const users = onePlant.users.map(e => 
                <NavLink key={e.id} to={`/users/${e.id}`}>
                {e.name === currentUser.name ? <p className="cuName groupMembers">{e.name}</p> : <p className="groupMembers">{e.name}</p>}
                </NavLink>
            )
            return users;
        } else {
            return "None yet!"
        }
    }

    function plantArticles() {
        if (onePlant.articles.length) {
            const articles = onePlant.articles.map(e => <div  key={e.id}>
                <NavLink to={`/articles/${e.id}`}>
                    <button className='articleButton'><div className="articleButtonTitle">{e.user.name}</div><br /> {e.body.length < 50 ? e.body : e.body.substring(0, 46) + "..."} </button>
                </NavLink>
            </div>)
            return articles;
        } else {
            return "None yet!"
        }
    }

    function handleAdd() {
        dispatch(linkUser(onePlant))
        dispatch(addPlant(onePlant))
    }
    
    function plantButton() {
        if (currentUser.name ) {
        const userPlantNames = currentUser.plants.map(e => e.name)
        const userHasPlant = userPlantNames.includes(onePlant.name)
            if (!userHasPlant) {
                return <button onClick={() => handleAdd()}>Add to {currentUser.name}'s Plants</button>
            }
        }
    }

    function showImage() {
        let image;

        if (onePlant.image) {
            image = onePlant.image
        } else {
            image = `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
        }
        return image;
    }

    return (
        <div className='onePlantCard'>
            <div className='plantCardContents'>
                <div className='plantLeft'>
                    <div className='plantTitle'>
                        {onePlant.name}
                    </div>
                    <div>
                        <img className='onePlantImage' alt={onePlant.name} src={showImage()} />
                    </div>
                </div>            
                <div className='plantRight'>
                    <div className='pu'>
                        Users:
                        <div className='plantUsers'>{plantUsers()}</div>
                    </div>            
                    <div className='pa'>
                        Guides:
                        <div className='plantArticles'>{plantArticles()}</div>
                    </div> 
                </div>
            </div>
            <div className='onePlantButtons'>
                <button className='returnButton' onClick={() => history.goBack()}>Return</button>
                {plantButton()}
            </div>
                
        </div>
    )
}

export default OnePlantFull;