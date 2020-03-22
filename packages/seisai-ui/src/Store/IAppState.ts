import { IUserState } from './User/IUserState';
import { IModalState } from './Modal/IModalState';
import { ICollectionState } from './Collections/ICollectionState';
import { IImportState } from './Import/IImportState';
import { IPhotoState } from './Photos/IPhotoState';
import { ILibraryState } from './Library/ILibraryState';

export interface IAppState {
  collections: ICollectionState;
  import: IImportState;
  library: ILibraryState;
  modal: IModalState;
  photos: IPhotoState;
  user: IUserState;
}
