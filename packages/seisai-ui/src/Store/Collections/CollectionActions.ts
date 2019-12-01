import { ICollection } from "./ICollection";
import { IAppState } from "Store/IAppState";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

export enum ActionTypes {
  Created = "seisai/collections/CREATED",
  Loaded = "seisai/collections/LOADED"
}

export const createCollection: ActionCreator<ThunkAction<
  Promise<ICollection>,
  IAppState,
  null,
  Action
>> = (data: Partial<ICollection>) => async dispatch => {
  const response = await fetch("/collections", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const collection = await response.json();

  dispatch(collectionCreated(collection));

  return collection;
};

export const collectionCreated = (collection: ICollection) => ({
  type: ActionTypes.Created,
  collection
});

export const loadCollections: ActionCreator<ThunkAction<
  Promise<ICollection[]>,
  IAppState,
  null,
  Action
>> = () => async dispatch => {
  const response = await fetch("/collections", {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const collections = await response.json();

  dispatch(collectionsLoaded(collections));

  return collections as ICollection[];
};

export const collectionsLoaded = (collections: ICollection[]) => ({
  type: ActionTypes.Loaded,
  collections
});
