import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Details from "./pages/Details";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";
import AddBarbecue from "./pages/AddBarbecue";

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/barbecues/details/:barbecueId"
          component={Details}
        />
        <PrivateRoute path="/barbecues" exact component={Schedule} />
        <PrivateRoute path="/barbecues/add" exact component={AddBarbecue} />
        <PrivateRoute
          path="/barbecues/:barbecueUuid"
          exact
          component={AddBarbecue}
        />
        <Route path="/login" component={Login} />
        <Redirect exact path="/" to="/barbecues" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
