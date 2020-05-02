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
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

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
      <Menu>
        <MenuItem
          icon="grid-view"
          text="All Photos"
          onClick={() => {
            dispatch(initLibrary());
            dispatch(selectCollection());
          }}
          key="all"
        />
        {shortcuts.map((shortcut) => (
          <MenuItem
            text={shortcut.name}
            onClick={() => dispatch(selectCollection(shortcut.id))}
          />
        ))}
        <MenuDivider title="Date Captured" />
        <MenuDivider title="Custom Collections" />
        <PillButton onClick={() => dispatch(openModal(CreateCollection))}>
          + Add
        </PillButton>
        {userCollections.map((collection) => (
          <MenuItem
            text={collection.name}
            onClick={() => dispatch(selectCollection(collection.id))}
          />
        ))}
        <MenuDivider title="Import Sessions" />
        {importCollections.map((collection) => (
          <MenuItem
            icon="cloud-upload"
            text={collection.name}
            onClick={() => dispatch(selectCollection(collection.id))}
          />
        ))}
      </Menu>
    </MosaicWindow>
  );
};
