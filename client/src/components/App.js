import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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
