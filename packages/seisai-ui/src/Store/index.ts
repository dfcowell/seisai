import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { IAppState } from "./IAppState";
import { UserReducer } from "./User/UserReducer";

const rootReducer = combineReducers({
  user: UserReducer
});

export const configureStore = (state?: IAppState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnahancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnahancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  return createStore(rootReducer, state, composedEnhancers);
};
