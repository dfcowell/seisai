import React from "react";
import { Switch, useRouteMatch, Route } from "react-router";

import { PageContainer } from "UI/Navigation/Primary/PageContainer";
import { Menu } from "UI/Navigation/Primary/Menu";
import { MenuItem } from "UI/Navigation/Primary/MenuItem";

import { LibraryView } from "./Library/LibraryView";

export const PrivateRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Menu>
        <MenuItem to="/">Library</MenuItem>
        <MenuItem to="/">Stories</MenuItem>
        <MenuItem to="/">Settings</MenuItem>
      </Menu>
      <PageContainer>
        <Switch>
          <Route path={path}>
            <LibraryView />
          </Route>
        </Switch>
      </PageContainer>
    </>
  );
};
