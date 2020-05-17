import { IPhoto } from './IPhoto';

export interface IPhotoState {
  photos: {
    [key: number]: IPhoto;
  };
  selected: number[];
  totalCount: number;
}
