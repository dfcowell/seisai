import { Action } from "redux";

import { IPhotoState } from "./IPhotoState";
import { PhotoAction } from "./PhotoActions";
import { IPhoto } from "./IPhoto";
import { IAppState } from "Store/IAppState";

const defaultState: IPhotoState = {
  photos: {},
  selected: [],
  totalCount: 0
};

type PhotoActions = Action<PhotoAction> & {
  photo?: IPhoto;
  photos?: IPhoto[] | number[];
  count?: number;
};

export const photoReducer = (state = defaultState, action: PhotoActions) => {
  switch (action.type) {
    case PhotoAction.Loaded:
      return {
        ...state,
        photos: {
          ...state.photos,
          ...(action.photos as IPhoto[]).reduce(
            (p, photo) => ({ ...p, [photo.id]: photo }),
            {}
          )
        },
        totalCount: action.count as number
      };
    case PhotoAction.Imported:
      const p = action.photo as IPhoto;
      return {
        ...state,
        photos: {
          ...state.photos,
          [p.id]: p
        },
        totalCount: state.totalCount + 1
      };
    case PhotoAction.SelectionUpdated:
      return {
        ...state,
        selected: action.photos as number[]
      };
    default:
      return state;
  }
};

export const getPhotos = (state: IAppState) =>
  Object.keys(state.photos.photos).map(k => state.photos.photos[Number(k)]);

export const getPhotoCount = (state: IAppState) => state.photos.totalCount;

export const getSelectedIds = (state: IAppState) => state.photos.selected;

export const getSelectedMap = (state: IAppState): { [key: number]: boolean } =>
  state.photos.selected.reduce(
    (m, id) => ({
      ...m,
      [id]: true
    }),
    {}
  );

export const getSelectedPhotos = (state: IAppState) =>
  state.photos.selected.map(id => state.photos.photos[id]);
