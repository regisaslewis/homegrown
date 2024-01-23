import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Login from './Login';
import Signup from './Signup';
import { switchButton } from "../navigation/buttonSlice";

function Greet() {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(switchButton(2))
    }, [dispatch])
    
  return (
    <div>
        <Login />
        <Signup />
    </div>
  )
}

export default Greet