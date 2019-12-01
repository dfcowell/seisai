import { ICollectionState } from "./ICollectionState";
import { ActionTypes } from "./CollectionActions";
import { Action } from "redux";
import { ICollection } from "./ICollection";
import { IAppState } from "Store/IAppState";
import { ICollectionTree } from "./ICollectionTree";

const defaultState: ICollectionState = {
  collections: {},
  dateRoots: [],
  userRoots: [],
  systemRoots: []
};

// TODO: Typings on these actions could be improved
type CollectionActions = Action<ActionTypes> & {
  collection?: ICollection;
  collections?: ICollection[];
};

export const collectionReducer = (
  state: ICollectionState = defaultState,
  action: CollectionActions
) => {
  switch (action.type) {
    case ActionTypes.Created:
      const collection = action.collection as ICollection;
      const userRoots = collection.parent
        ? state.userRoots
        : [...state.userRoots, collection.id];

      return {
        ...state,
        collections: {
          ...state.collections,
          [collection.id]: collection
        },
        userRoots
      };
    case ActionTypes.Loaded:
      const collections = action.collections as ICollection[];

      return collections.reduce(
        (value: ICollectionState, collection) => {
          const rootKey = `${collection.type}Roots` as keyof ICollectionState;
          const isRoot = !collection.parent;

          return {
            ...value,
            collections: {
              ...value.collections,
              [collection.id]: collection
            },
            [rootKey]: isRoot
              ? [...(value[rootKey] as number[]), collection.id]
              : value[rootKey]
          };
        },
        {
          collections: {},
          dateRoots: [],
          userRoots: [],
          systemRoots: []
        }
      );

    default:
      return state;
  }
};

export const getCollections = (state: IAppState, ids: number[]) =>
  ids.map(id => state.collections.collections[id]);

export const getCollectionTrees = (
  state: IAppState,
  ids: number[]
): ICollectionTree[] =>
  ids.reduce((trees, id) => {
    const collection = state.collections.collections[id];
    return [
      ...trees,
      {
        ...collection,
        children: collection.children
          ? getCollectionTrees(state, collection.children)
          : []
      }
    ];
  }, [] as ICollectionTree[]);

export const getUserCollectionTrees = (state: IAppState) =>
  getCollectionTrees(state, state.collections.userRoots);
