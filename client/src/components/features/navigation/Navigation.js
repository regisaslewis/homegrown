import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentButton, switchButton } from "./buttonSlice";
import { getCurrentUser } from "../users/currentUserSlice";

function Navigation({ buttonOn, buttonOff}) {

    const buttonStyle = useSelector(getCurrentButton)
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)

    function switchOn(num) {
        if (buttonStyle === num) {
            return buttonOn
        } else {
            return buttonOff
        }
    }

    return (
        <div>
            <h2>Navigation Page</h2>            
            <NavLink to="/users" exact>
                <button style={switchOn(4)} onClick={() => dispatch(switchButton(4))}>Users</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button style={switchOn(5)} onClick={() => dispatch(switchButton(5))}>Groups</button>
            </NavLink>
            <NavLink to="/plants" exact>
                <button style={switchOn(6)} onClick={() => dispatch(switchButton(6))}>Plants</button>
            </NavLink>
            <NavLink to="/plant_families" exact>
                <button style={switchOn(7)} onClick={() => dispatch(switchButton(7))}>Plant Families</button>
            </NavLink>
            <NavLink to="/articles" exact>
                <button style={switchOn(8)} onClick={() => dispatch(switchButton(8))}>Articles</button>
            </NavLink>
        </div>
    )
}

export default Navigation;