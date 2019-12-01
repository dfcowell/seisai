import React, { FC } from "react";
import { connect } from "react-redux";

import { IAppState } from "Store/IAppState";
import { IUserData } from "Store/User/IUserData";
import { PublicRoutes } from "Public";
import { PrivateRoutes } from "Private";
import { getUser, isUserLoading } from "Store/User/UserReducer";

type RouteComponentProps = { user?: IUserData; loading: boolean };

const RouteComponent: FC<RouteComponentProps> = ({ loading, user }) =>
  loading ? null : user ? <PrivateRoutes /> : <PublicRoutes />;

export const Routes = connect((state: IAppState) => ({
  user: getUser(state),
  loading: isUserLoading(state)
}))(RouteComponent);
