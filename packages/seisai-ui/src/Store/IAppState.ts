import { IUserState } from "./User/IUserState";
import { IModalState } from "./Modal/IModalState";
import { ICollectionState } from "./Collections/ICollectionState";

export interface IAppState {
  collections: ICollectionState;
  modal: IModalState;
  user: IUserState;
}
