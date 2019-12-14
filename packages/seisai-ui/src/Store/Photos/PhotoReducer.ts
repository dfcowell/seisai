import { Action } from "redux";

import { IPhotoState } from "./IPhotoState";
import { PhotoAction } from "./PhotoActions";
import { IPhoto } from "./IPhoto";
import { IAppState } from "Store/IAppState";

const defaultState: IPhotoState = {
  photos: {},
  totalCount: 0
};

type PhotoActions = Action<PhotoAction> & {
  photos?: IPhoto[];
  count?: number;
};

export const photoReducer = (state = defaultState, action: PhotoActions) => {
  switch (action.type) {
    case PhotoAction.Loaded:
      return {
        photos: {
          ...state.photos,
          ...(action.photos as IPhoto[]).reduce(
            (p, photo) => ({ ...p, [photo.id]: photo }),
            {}
          )
        },
        totalCount: action.count as number
      };
    default:
      return state;
  }
};

export const getPhotos = (state: IAppState) =>
  Object.keys(state.photos.photos).map(k => state.photos.photos[Number(k)]);

export const getPhotoCount = (state: IAppState) => state.photos.totalCount;
