import React from "react";
import { Switch, useRouteMatch, Route } from "react-router";
import { ConnectedLoginForm } from "./Login/LoginForm";
import { RegisterForm } from "./Register/RegisterForm";

export const PublicRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <ConnectedLoginForm />
      </Route>
      <Route path={`${path}/register`}>
        <RegisterForm />
      </Route>
    </Switch>
  );
};
