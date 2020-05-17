import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router';

import { PageContainer } from 'Seisai/UI/Navigation/Primary/PageContainer';
import { MenuItem } from 'Seisai/UI/Navigation/Primary/MenuItem';

import { LibraryView } from './Library/LibraryView';
import { Navbar, NavbarGroup, Alignment } from '@blueprintjs/core';

export const PrivateRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Navbar fixedToTop={true}>
        <NavbarGroup align={Alignment.LEFT}>
          <MenuItem to="/">Library</MenuItem>
          <MenuItem to="/">Stories</MenuItem>
          <MenuItem to="/">Settings</MenuItem>
        </NavbarGroup>
      </Navbar>
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
