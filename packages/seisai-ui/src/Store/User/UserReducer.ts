import { IUserState } from "./IUserState";
import { Action } from "redux";
import { IAppState } from "Store/IAppState";
import { ActionTypes } from "./UserActions";
import { IUserData } from "./IUserData";

const defaultState: IUserState = {
  loading: true
};

type UserActions = Action<ActionTypes> & { user?: IUserData };

export const userReducer = (
  state: IUserState = defaultState,
  action: UserActions
) => {
  switch (action.type) {
    case ActionTypes.LoggedOut:
      return {
        loading: false
      };
    case ActionTypes.LoggedIn:
      return {
        loading: false,
        data: action.user
      };
    default:
      return state;
  }
};

export const getUser = (state: IAppState) => state.user.data;
export const isUserLoading = (state: IAppState) => state.user.loading;
