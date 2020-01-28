import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { loadCollections } from "Store/Collections/CollectionActions";
import { getUserCollectionTrees } from "Store/Collections/CollectionReducer";
import { IAppState } from "Store/IAppState";
import { isModalOpen, getModalContent } from "Store/Modal/ModalReducer";
import { openModal } from "Store/Modal/ModalActions";
import { DrawerContainer } from "UI/Containers/Drawer/DrawerContainer";
import { DrawerHeader } from "UI/Containers/Drawer/DrawerHeader";
import { DrawerBody } from "UI/Containers/Drawer/DrawerBody";
import { PillButton } from "UI/Forms/Buttons";
import { H3 } from "UI/Typography/H3";

import { CollectionGroup } from "./CollectionGroup";
import { CreateCollection } from "./CreateCollection";
import { CollectionListItem } from "./CollectionListItem";
import { ICollectionTree } from "Store/Collections/ICollectionTree";
import { MosaicWindow, MosaicBranch } from "react-mosaic-component";
import { LibraryTileId } from "../LibraryTileId";

type LibraryViewProps = {
  openAddCollectionModal: () => void;
  loadCollections: () => void;
  userCollections: ICollectionTree[];
  path: MosaicBranch[];
};

// TODO: This component is getting out of hand. Refactor it.
const CollectionsPanelComponent: FC<LibraryViewProps> = ({
  openAddCollectionModal,
  loadCollections,
  userCollections,
  path
}) => {
  const [state, setState] = useState({ loadedCollections: false });

  useEffect(() => {
    if (!state.loadedCollections) {
      setState({ loadedCollections: true });
      loadCollections();
    }
  }, [state.loadedCollections, loadCollections]);

  return (
    <MosaicWindow<LibraryTileId> path={path} title="Collections">
      <CollectionGroup></CollectionGroup>
      <CollectionGroup>
        <H3>Date Captured</H3>
      </CollectionGroup>
      <CollectionGroup>
        <H3>
          <span>Custom Collections</span>
          <PillButton onClick={openAddCollectionModal}>+ Add</PillButton>
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
    </MosaicWindow>
  );
};

export const CollectionsPanel = connect(
  (state: IAppState) => ({
    showModal: isModalOpen(state),
    ModalComponent: getModalContent(state),
    userCollections: getUserCollectionTrees(state)
  }),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    loadCollections: () => dispatch(loadCollections()),
    openAddCollectionModal: () => dispatch(openModal(CreateCollection))
  })
)(CollectionsPanelComponent);
