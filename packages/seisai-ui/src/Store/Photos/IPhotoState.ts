import { IPhoto } from "./IPhoto";

export interface IPhotoState {
  photos: {
    [key: number]: IPhoto;
  };
  totalCount: number;
}
