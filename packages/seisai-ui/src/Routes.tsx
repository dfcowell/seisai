import React, { FC } from 'react';
import { connect } from 'react-redux';

import { IAppState } from 'Seisai/Store/IAppState';
import { IUserData } from 'Seisai/Store/User/IUserData';
import { PublicRoutes } from 'Seisai/Public';
import { PrivateRoutes } from 'Seisai/Private';
import { getUser, isUserLoading } from 'Seisai/Store/User/UserReducer';

type RouteComponentProps = { user?: IUserData; loading: boolean };

const RouteComponent: FC<RouteComponentProps> = ({ loading, user }) =>
  loading ? null : user ? <PrivateRoutes /> : <PublicRoutes />;

export const Routes = connect((state: IAppState) => ({
  user: getUser(state),
  loading: isUserLoading(state),
}))(RouteComponent);
