import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { IUserData } from "./IUserData";

export enum UserActionType {
  LoggedIn = "seisai/user/LOGGED_IN",
  LoggedOut = "seisai/user/LOGGED_OUT"
}

export type UserCredentials = {
  username: string;
  password: string;
};

export const checkAuth: ActionCreator<ThunkAction<
  void,
  IAppState,
  null,
  Action
>> = () => async dispatch => {
  const response = await fetch("/auth");

  if (response.status !== 200) {
    dispatch(loggedOut());
    return;
  }

  const user = await response.json();

  dispatch(loggedIn(user));
};

export const logIn: ActionCreator<ThunkAction<
  Promise<IUserData>,
  IAppState,
  null,
  Action
>> = (credentials: UserCredentials) => async dispatch => {
  const response = await fetch("/auth/login", {
    method: "post",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const user = await response.json();

  dispatch(loggedIn(user));

  return user as IUserData;
};

export const loggedIn = (user: IUserData) => ({
  type: UserActionType.LoggedIn,
  user
});

export const signOut: ActionCreator<ThunkAction<
  void,
  IAppState,
  null,
  Action
>> = () => async dispatch => {
  dispatch(loggedOut());
};

export const loggedOut = () => ({
  type: UserActionType.LoggedOut
});
