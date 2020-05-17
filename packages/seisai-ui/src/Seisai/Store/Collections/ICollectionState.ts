import { ICollection } from './ICollection';

export interface ICollectionState {
  shortcuts: { id: number; name: string }[];
  collections: {
    [key: number]: ICollection;
  };
  dateRoots: number[];
  systemRoots: number[];
  userRoots: number[];
  importRoots: number[];
}
