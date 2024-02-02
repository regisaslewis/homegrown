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
                        <button>Plant: {e.plant.name} </button>
                    </NavLink>
                </div>
            )
        }
    }

    function plants() {
        if (oneUser.plants.length > 0) {
            return oneUser.plants.map(e => {
                return <p key={e.id}>{e.name}</p>
            })
        }
    }

    return (
        <div>
            <h3>{oneUser.name}'s User Page</h3>
            <h4>Plants:</h4>
            {plants()}
            <h4>Articles:</h4>
            {articles()}
            <br />
            <button onClick={() => history.goBack()}>Return</button>
        </div>
    )
}

export default OneUserFull;