import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Navigation"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import Users from "./features/users/Users"
import Groups from "./features/groups/Groups"
import Plants from "./features/plants/Plants";
import PlantFamilies from "./features/plant_families/PlantFamilies"
import Articles from "./features/articles/Articles"

function App() {

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

  return (
    <div>
      <h1>HomeGrown Frontend</h1>
      <Navigation
        buttonOn = {buttonOn}
        buttonOff = {buttonOff}
      />
      <Switch>
        <Route exact path="/">
          {<Home />}{/* Conditional Redirect to "/signup" based on user here. */}
        </Route>
        <Route exact path="/signup">
          <Signup />{/* Conditional Redirect to "/" based on NOT user here. */}
        </Route>
        <Route exact path="/login">
          <Login />
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
