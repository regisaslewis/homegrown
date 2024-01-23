import React from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import Navigation from "./features/navigation/Navigation"
import { useSelector, useDispatch } from "react-redux"

import Home from "./Home"
import Greet from "./features/forms/Greet"
import Users from "./features/users/Users"
import Groups from "./features/groups/Groups"
import Plants from "./features/plants/Plants";
import PlantFamilies from "./features/plant_families/PlantFamilies"
import Articles from "./features/articles/Articles"

import { getCurrentUser, logOutUser } from "./features/users/currentUserSlice"

function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser)
  const loggedTest = Object.keys(currentUser).length > 0 && typeof(currentUser) === "object"

  const buttonOn = {
    color: "white",
    backgroundColor: "black",
    transform: "scale(.95)",
    zIndex: "-1"
  }

  const buttonOff = {
    color: "black",
    backgroundColor: "lightgray"
  }

  function handleLogout() {
    dispatch(logOutUser());
    history.push("/greet")
  }

  return (
    <div>
      <h1>HomeGrown Frontend</h1>
      <button onClick={handleLogout}>Logout</button>
      <Navigation
        buttonOn = {buttonOn}
        buttonOff = {buttonOff}
      />
      <Switch>
        <Route exact path="/">
          {loggedTest ?
          <Home /> : 
          <Redirect to="/greet" />}
        </Route>
        <Route exact path="/greet">
          {!loggedTest ?
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
  )
}

export default App;
