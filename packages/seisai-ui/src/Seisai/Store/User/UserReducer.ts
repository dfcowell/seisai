import { IUserState } from './IUserState';
import { Action } from 'redux';
import { IAppState } from 'Seisai/Store/IAppState';
import { UserActionType } from './UserActions';
import { IUserData } from './IUserData';

const defaultState: IUserState = {
  loading: true,
};

type UserActions = Action<UserActionType> & { user?: IUserData };

export const userReducer = (
  state: IUserState = defaultState,
  action: UserActions,
) => {
  switch (action.type) {
    case UserActionType.LoggedOut:
      return {
        loading: false,
      };
    case UserActionType.LoggedIn:
      return {
        loading: false,
        data: action.user,
      };
    default:
      return state;
  }
};

export const getUser = (state: IAppState) => state.user.data;
export const isUserLoading = (state: IAppState) => state.user.loading;
