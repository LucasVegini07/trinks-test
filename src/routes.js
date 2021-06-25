import React from "react";
import { Switch, Route } from "react-router-dom";
import Start from "./pages/Start";
export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={Start} />
    </Switch>
  );
}
