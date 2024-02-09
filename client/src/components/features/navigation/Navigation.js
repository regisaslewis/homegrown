import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentButton, switchButton } from "./buttonSlice";
import { setFormVisibility as groupFormVisibility } from "../groups/groupsSlice";
import { setFormVisibility as plantFormVisibility } from "../plants/plantsSlice";
import { setFormVisibility as pfFormVisibility } from "../plant_families/plantFamiliesSlice";
import { setNewFormVisibility } from "../articles/articlesSlice";

function Navigation({ buttonOn, buttonOff}) {

    const buttonStyle = useSelector(getCurrentButton)
    const dispatch = useDispatch();

    function switchOn(num) {
        if (buttonStyle === num) {
            return buttonOn
        } else {
            return buttonOff
        }
    }

    function formsOff() {
        dispatch(setNewFormVisibility(false))
        dispatch(groupFormVisibility(false))
        dispatch(plantFormVisibility(false))
        dispatch(pfFormVisibility(false))
    }

    function switchClose(num) {
        dispatch(switchButton(num))
        formsOff()
    }

    return (
        <div id="navButtons">        
            <NavLink to="/users" exact>
                <button className="navBut" style={switchOn(4)} onClick={() => switchClose(4)}>Users</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button className="navBut" style={switchOn(5)} onClick={() => switchClose(5)}>Groups</button>
            </NavLink>
            <NavLink to="/plants" exact>
                <button className="navBut" style={switchOn(6)} onClick={() => switchClose(6)}>Plants</button>
            </NavLink>
            <NavLink to="/plant_families" exact>
                <button className="navBut" style={switchOn(7)} onClick={() => switchClose(7)}>Plant Families</button>
            </NavLink>
            <NavLink to="/articles" exact>
                <button className="navBut" style={switchOn(8)} onClick={() =>switchClose(8)}>Guides</button>
            </NavLink>
        </div>
    )
}

export default Navigation;