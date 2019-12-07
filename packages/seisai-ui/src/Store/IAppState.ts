import { IUserState } from "./User/IUserState";
import { IModalState } from "./Modal/IModalState";
import { ICollectionState } from "./Collections/ICollectionState";
import { IImportState } from "./Import/IImportState";

export interface IAppState {
  collections: ICollectionState;
  import: IImportState,
  modal: IModalState;
  user: IUserState;
}
