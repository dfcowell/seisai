import React, { FC, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  loadCollections,
  loadShortcuts,
} from 'Store/Collections/CollectionActions';
import {
  getUserCollectionTrees,
  getShortcuts,
  getImportCollectionTrees,
} from 'Store/Collections/CollectionReducer';
import { openModal } from 'Store/Modal/ModalActions';
import { PillButton } from 'UI/Forms/Buttons';
import { H3 } from 'UI/Typography/H3';

import { CollectionGroup } from './CollectionGroup';
import { CreateCollection } from './CreateCollection';
import { CollectionListItem } from './CollectionListItem';
import { MosaicWindow, MosaicBranch } from 'react-mosaic-component';
import { LibraryTileId } from '../LibraryTileId';
import { selectCollection, initLibrary } from 'Store/Library/LibraryActions';

type LibraryViewProps = {
  path: MosaicBranch[];
};

// TODO: This component is getting out of hand. Refactor it.
export const CollectionsPanel: FC<LibraryViewProps> = ({ path }) => {
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!collectionsLoaded) {
      setCollectionsLoaded(true);
      dispatch(loadCollections());
      dispatch(loadShortcuts());
    }
  }, [collectionsLoaded, setCollectionsLoaded, loadCollections]);

  const importCollections = useSelector(getImportCollectionTrees);
  const userCollections = useSelector(getUserCollectionTrees);
  const shortcuts = useSelector(getShortcuts);

  return (
    <MosaicWindow<LibraryTileId> path={path} title="Collections">
      <CollectionGroup>
        <ul>
          <li>
            <button
              onClick={() => {
                dispatch(initLibrary());
                dispatch(selectCollection());
              }}
              key="all"
            >
              All Photos
            </button>
          </li>
          {shortcuts.map(shortcut => (
            <li key={shortcut.id}>
              <button onClick={() => dispatch(selectCollection(shortcut.id))}>
                {shortcut.name}
              </button>
            </li>
          ))}
        </ul>
      </CollectionGroup>
      <CollectionGroup>
        <H3>Date Captured</H3>
      </CollectionGroup>
      <CollectionGroup>
        <H3>
          <span>Custom Collections</span>
          <PillButton onClick={() => dispatch(openModal(CreateCollection))}>
            + Add
          </PillButton>
        </H3>
        {userCollections.map(collection => (
          <CollectionListItem
            key={collection.id}
            collection={collection}
            collapse={() => {}}
            onClick={() => {}}
          />
        ))}
      </CollectionGroup>
      <CollectionGroup>
        <H3>Import Sessions</H3>
        <ul>
          {importCollections.map(collection => (
            <li key={collection.id}>
              <button onClick={() => dispatch(selectCollection(collection.id))}>
                {collection.name}
              </button>
            </li>
          ))}
        </ul>
      </CollectionGroup>
    </MosaicWindow>
  );
};
