import { ICollection } from "./ICollection";

export interface ICollectionState {
  collections: {
    [key: number]: ICollection;
  };
  dateRoots: number[];
  systemRoots: number[];
  userRoots: number[];
}
