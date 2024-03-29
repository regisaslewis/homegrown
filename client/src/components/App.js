import React, { useEffect } from "react"
import { NavLink, Switch, Route, Redirect, useHistory } from "react-router-dom"
import Navigation from "./features/navigation/Navigation"
import { useSelector, useDispatch } from "react-redux"

import "./App.css"
import Home from "./Home"
import Greet from "./features/forms/Greet"
import Users from "./features/users/Users"
import OneUserFull from "./features/users/OneUserFull"
import Groups from "./features/groups/Groups"
import Plants from "./features/plants/Plants";
import OnePlantFull from "./features/plants/OnePlantFull"
import PlantFamilies from "./features/plant_families/PlantFamilies"
import Articles from "./features/articles/Articles"
import OneArticleFull from "./features/articles/OneArticleFull"

import { fetchUsers } from "./features/users/usersSlice"

import { getCurrentUser, logOutUser } from "./features/users/currentUserSlice"
import { getCurrentButton, switchButton } from "./features/navigation/buttonSlice"
import { setFormVisibility as groupFormVisibility } from "./features/groups/groupsSlice"
import { setFormVisibility as plantFormVisibility } from "./features/plants/plantsSlice"
import { setFormVisibility as pfFormVisibility } from "./features/plant_families/plantFamiliesSlice"
import { setNewFormVisibility } from "./features/articles/articlesSlice"

function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser)
  const buttonStyle = useSelector(getCurrentButton)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const buttonOn = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(0, 0, 0, 0)",
    textShadow: "none",
    border: "none",
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

  function handleLogout() {
    dispatch(logOutUser());
    history.push("/greet")
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
    <div>
      <div id="overhead">
        <h1>HomeGrown</h1>
        <h2>{currentUser.name ? <NavLink to="/">Welcome, {currentUser.name}</NavLink> : ""}</h2>
      </div>
      <div id="userButtons">
          {currentUser.name ?
                <NavLink to="/" exact>
                    <button style={switchOn(1)} onClick={() => switchClose(1)}>Home</button>
                </NavLink>:
                <NavLink to="/greet" exact>
                    <button style={switchOn(2)} onClick={() => switchClose(2)}>Login/Signup</button>
                </NavLink>}
          {currentUser.name ? <button style={buttonOff} onClick={handleLogout}>Logout</button> : ""}
        </div>
      <div id="navigation">
        <Navigation />
      </div>
      <div id="currentView">
        <Switch>
          <Route exact path="/">
            {currentUser.name ?
            <Home /> : 
            <Redirect to="/greet" />}
          </Route>
          <Route exact path="/greet">
            {!currentUser.name ?
            <Greet /> : 
            <Redirect to="/" exact />}
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:userID">
            <OneUserFull />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route exact path="/plants">
            <Plants />
          </Route>
          <Route path="/plants/:plantID">
            <OnePlantFull />
          </Route>
          <Route exact path="/plant_families">
            <PlantFamilies />
          </Route>
          <Route exact path="/articles">
            <Articles />
          </Route>
          <Route path="/articles/:articleID">
            <OneArticleFull />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
