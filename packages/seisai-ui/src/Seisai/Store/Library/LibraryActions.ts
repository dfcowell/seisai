import { LibraryAction, LibraryActions } from './LibraryTypes';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from 'Seisai/Store/IAppState';
import { loadPhotos } from 'Seisai/Store/Photos/PhotoActions';

export const initLibrary: ActionCreator<ThunkAction<
  Promise<void>,
  IAppState,
  null,
  LibraryActions
>> = () => async (dispatch) => {
  const photos = await dispatch(loadPhotos());

  dispatch({
    type: LibraryAction.DisplayPhotos,
    photoIds: photos.map((photo) => photo.id),
  });
};

export const selectCollection: ActionCreator<ThunkAction<
  Promise<void>,
  IAppState,
  null,
  LibraryActions
>> = (collection: number) => async (dispatch) => {
  const photos = await dispatch(loadPhotos({ collection: collection }));

  dispatch({
    type: LibraryAction.SelectCollection,
    collectionId: collection,
  });

  dispatch({
    type: LibraryAction.DisplayPhotos,
    photoIds: photos.map((photo) => photo.id),
  });
};
