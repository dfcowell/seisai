import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { IAppState } from "./IAppState";
import { userReducer } from "./User/UserReducer";
import { modalReducer } from "./Modal/ModalReducer";
import { collectionReducer } from "./Collections/CollectionReducer";

const rootReducer = combineReducers({
  collections: collectionReducer,
  modal: modalReducer,
  user: userReducer
});

export const configureStore = (state?: IAppState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnahancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnahancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  return createStore(rootReducer, state, composedEnhancers);
};
