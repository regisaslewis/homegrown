import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentButton, switchButton } from "./buttonSlice";
import { setFormVisibility as groupFormVisibility } from "../groups/groupsSlice";
import { setFormVisibility as plantFormVisibility } from "../plants/plantsSlice";
import { setFormVisibility as pfFormVisibility } from "../plant_families/plantFamiliesSlice";
import { setNewFormVisibility } from "../articles/articlesSlice";

function Navigation() {

    const buttonStyle = useSelector(getCurrentButton)
    const dispatch = useDispatch();

    const buttonOn = {
      textShadow: "-2px 2px black",
      backgroundColor: "bisque",
      borderRight: "none",
      zIndex: "-1"
    }
  
    const buttonOff = {
      color: "black",
    }

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
                <button className="navBut" style={switchOn(4)} onClick={() => switchClose(4)}>{buttonStyle !== 4 ? <div>Users</div> : <div className="viewName usersPage">Users!</div>}</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button className="navBut" style={switchOn(5)} onClick={() => switchClose(5)}>{buttonStyle !== 5 ? <div>Groups</div> : <div className="viewName groupsPage">Groups!</div>}</button>
            </NavLink>
            <NavLink to="/plants" exact>
                <button className="navBut" style={switchOn(6)} onClick={() => switchClose(6)}>{buttonStyle !== 6 ? <div>Plants</div> : <div className="viewName plantsPage">Plants!</div>}</button>
            </NavLink>
            <NavLink to="/plant_families" exact>
                <button className="navBut" style={switchOn(7)} onClick={() => switchClose(7)}>{buttonStyle !== 7 ? <div>Plant Families</div> : <div className="viewName pfPage">Plant Families!</div>}</button>
            </NavLink>
            <NavLink to="/articles" exact>
                <button className="navBut" style={switchOn(8)} onClick={() =>switchClose(8)}>{buttonStyle !== 8 ? <div>Guides</div> : <div className="viewName articlesPage">Guides!</div>}</button>
            </NavLink>
        </div>
    )
}

export default Navigation;