import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IAppState } from 'Store/IAppState';

import { IPhoto } from './IPhoto';

export enum PhotoAction {
  Imported = 'seisai/photos/IMPORTED',
  Loaded = 'seisai/photos/LOADED',
  SelectionUpdated = 'seisai/photos/SELECTION_UPDATED',
}

export const loadPhotos: ActionCreator<ThunkAction<
  Promise<IPhoto[]>,
  IAppState,
  null,
  Action
>> = (params: { [key: string]: string | number } = {}) => async dispatch => {
  const response = await axios.get('/photos', { params });

  const { count, photos } = response.data;

  const photoData: IPhoto[] = photos.map((data: any) => ({
    ...data,
    created: new Date(data.created),
    updated: new Date(data.updated),
  }));

  dispatch(photosLoaded(photoData, count));

  return photos as IPhoto[];
};

export const photosLoaded = (photos: IPhoto[], count: number) => ({
  type: PhotoAction.Loaded,
  photos,
  count,
});

export const photoImported = (photo: IPhoto) => ({
  type: PhotoAction.Imported,
  photo,
});

export const selectionUpdated = (photos: number[]) => ({
  type: PhotoAction.SelectionUpdated,
  photos,
});
