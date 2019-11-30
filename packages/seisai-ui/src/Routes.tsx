import React, { FC } from "react";
import { connect } from "react-redux";

import { IAppState } from "Store/IAppState";
import { IUserData } from "Store/User/IUserData";
import { PublicRoutes } from "Public";
import { PrivateRoutes } from "Private";

type RouteComponentProps = { user?: IUserData };

const RouteComponent: FC<RouteComponentProps> = ({ user }) =>
  user ? <PrivateRoutes /> : <PublicRoutes />;

export const Routes = connect((state: IAppState) => ({
  user: state.user.data
}))(RouteComponent);
