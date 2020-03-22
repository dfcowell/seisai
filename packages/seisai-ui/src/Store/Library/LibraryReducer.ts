import { ILibraryState } from './ILibraryState';
import { LibraryActions, LibraryAction } from './LibraryTypes';
import { IAppState } from 'Store/IAppState';
import { getCollection } from 'Store/Collections/CollectionReducer';
import { getPhotos } from 'Store/Photos/PhotoReducer';

const defaultState: ILibraryState = {
  selection: [],
  photoIds: [],
};

export const libraryReducer = (
  state = defaultState,
  action: LibraryActions,
) => {
  switch (action.type) {
    case LibraryAction.SelectCollection:
      return {
        ...state,
        collectionId: action.collectionId,
      };

    case LibraryAction.DisplayPhotos:
      return {
        ...state,
        photoIds: action.photoIds,
      };

    default:
      return state;
  }
};

export const getSelectedCollection = (state: IAppState) =>
  state.library.collectionId
    ? getCollection(state, state.library.collectionId)
    : null;

export const getLibraryPhotos = (state: IAppState) =>
  getPhotos(state, state.library.photoIds);
