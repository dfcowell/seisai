import React from "react";
import { Switch, useRouteMatch } from "react-router";

export const PrivateRoutes = () => {
  const { path } = useRouteMatch();
  return <Switch>Super Secret</Switch>;
};
