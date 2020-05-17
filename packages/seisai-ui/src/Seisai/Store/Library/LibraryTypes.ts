export enum LibraryAction {
  DisplayPhotos = 'seisai/library/DISPLAY_PHOTOS',
  SelectCollection = 'seisai/library/SELECT_COLLECTION',
}

interface DisplayPhotosAction {
  type: typeof LibraryAction.DisplayPhotos;
  photoIds: number[];
}

interface SelectCollectionAction {
  type: typeof LibraryAction.SelectCollection;
  collectionId: number;
}

export type LibraryActions = DisplayPhotosAction | SelectCollectionAction;
