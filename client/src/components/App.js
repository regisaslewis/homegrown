import React from "react"
import { NavLink, Switch, Route, Redirect, useHistory } from "react-router-dom"
import Navigation from "./features/navigation/Navigation"
import { useSelector, useDispatch } from "react-redux"

import "./App.css"
import Home from "./Home"
import Greet from "./features/forms/Greet"
import Users from "./features/users/Users"
import Groups from "./features/groups/Groups"
import Plants from "./features/plants/Plants";
import PlantFamilies from "./features/plant_families/PlantFamilies"
import Articles from "./features/articles/Articles"

import { getCurrentUser, logOutUser } from "./features/users/currentUserSlice"
import { getCurrentButton, switchButton } from "./features/navigation/buttonSlice"

function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser)
  const buttonStyle = useSelector(getCurrentButton)

  const buttonOn = {
    color: "black",
    border: "none",
    backgroundColor: "rgb(162, 229, 212)",
    borderRadius: "40px 0 0 40px",
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

  return (
    <div>
      <div id="overhead">
        <h1>HomeGrown</h1>
        <p>Current User: {currentUser.name ? currentUser.name : "nobody"}</p>
      </div>
      <div id="userButtons">
          {currentUser.name ?
                <NavLink to="/" exact>
                    <button style={switchOn(1)} onClick={() => dispatch(switchButton(1))}>Home</button>
                </NavLink>:
                <NavLink to="/greet" exact>
                    <button style={switchOn(2)} onClick={() => dispatch(switchButton(2))}>Login/Signup</button>
                </NavLink>}
          {currentUser.name ? <button style={buttonOff} onClick={handleLogout}>Logout</button> : ""}
        </div>
      <div id="navigation">
        <Navigation
          buttonOn = {buttonOn}
          buttonOff = {buttonOff}
        />
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
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route exact path="/plants">
            <Plants />
          </Route>
          <Route exact path="/plant_families">
            <PlantFamilies />
          </Route>
          <Route exact path="/articles">
            <Articles />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
