import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Navigation"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import Users from "./Users"
import Groups from "./Groups"
import Plants from "./Plants"
import Plant_Families from "./Plant_Families"
import Articles from "./Articles"

function App() {
  return (
    <div>
      <h1>HomeGrown Frontend</h1>
      <Navigation />
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
          <Plant_Families />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
