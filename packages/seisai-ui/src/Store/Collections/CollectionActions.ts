import { ICollection } from './ICollection';
import { IAppState } from 'Store/IAppState';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IShortcut } from './IShortcut';
import Axios from 'axios';

export enum ActionTypes {
  Created = 'seisai/collections/CREATED',
  Loaded = 'seisai/collections/LOADED',
  ShortcutsLoaded = 'seisai/collections/SHORTCUTS_LOADED',
}

export const createCollection: ActionCreator<ThunkAction<
  Promise<ICollection>,
  IAppState,
  null,
  Action
>> = (data: Partial<ICollection>) => async dispatch => {
  const response = await fetch('/collections', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const collection = await response.json();

  dispatch(collectionCreated(collection));

  return collection;
};

export const collectionCreated = (collection: ICollection) => ({
  type: ActionTypes.Created,
  collection,
});

export const loadShortcuts: ActionCreator<ThunkAction<
  Promise<IShortcut[]>,
  IAppState,
  null,
  Action
>> = () => async dispatch => {
  const response = await Axios.get<IShortcut[]>('/collections/shortcuts');

  dispatch(shortcutsLoaded(response.data));

  return response.data;
};

export const loadCollections: ActionCreator<ThunkAction<
  Promise<ICollection[]>,
  IAppState,
  null,
  Action
>> = () => async dispatch => {
  const response = await Axios.get<ICollection[]>('/collections');

  dispatch(collectionsLoaded(response.data));

  return response.data;
};

export const collectionsLoaded = (collections: ICollection[]) => ({
  type: ActionTypes.Loaded,
  collections,
});

export const shortcutsLoaded = (shortcuts: IShortcut[]) => ({
  type: ActionTypes.ShortcutsLoaded,
  shortcuts,
});
