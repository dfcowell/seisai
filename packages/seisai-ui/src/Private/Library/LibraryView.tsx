import React, { FC, ComponentType, useEffect, useState } from "react";
import { DrawerContainer } from "UI/Containers/Drawer/DrawerContainer";
import { DrawerHeader } from "UI/Containers/Drawer/DrawerHeader";
import { DrawerBody } from "UI/Containers/Drawer/DrawerBody";
import { CollectionGroup } from "./Collections/CollectionGroup";
import { H3 } from "UI/Typography/H3";
import { Backdrop } from "UI/Containers/Modal/Backdrop";
import { Container } from "UI/Containers/Modal/Container";
import { connect } from "react-redux";
import { IAppState } from "Store/IAppState";
import { isModalOpen, getModalContent } from "Store/Modal/ModalReducer";
import { openModal } from "Store/Modal/ModalActions";
import { CreateCollection } from "./Collections/CreateCollection";
import { PillButton } from "UI/Forms/Buttons";
import { loadCollections } from "Store/Collections/CollectionActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getUserCollectionTrees } from "Store/Collections/CollectionReducer";
import { CollectionListItem } from "./Collections/CollectionListItem";
import { ICollectionTree } from "Store/Collections/ICollectionTree";

type LibraryViewProps = {
  ModalComponent?: ComponentType;
  showModal: boolean;
  openAddCollectionModal: () => void;
  loadCollections: () => void;
  userCollections: ICollectionTree[];
};

// TODO: This component is getting out of hand. Refactor it.
const LibraryViewComponent: FC<LibraryViewProps> = ({
  ModalComponent,
  showModal,
  openAddCollectionModal,
  loadCollections,
  userCollections
}) => {
  const [state, setState] = useState({ loadedCollections: false });

  useEffect(() => {
    if (!state.loadedCollections) {
      setState({ loadedCollections: true });
      loadCollections();
    }
  }, [state.loadedCollections, loadCollections]);

  return (
    <>
      <DrawerContainer width="20rem">
        <DrawerHeader>Collections</DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
      </DrawerContainer>
      {showModal && ModalComponent && (
        <Backdrop>
          <Container>
            <ModalComponent />
          </Container>
        </Backdrop>
      )}
    </>
  );
};

export const LibraryView = connect(
  (state: IAppState) => ({
    showModal: isModalOpen(state),
    ModalComponent: getModalContent(state),
    userCollections: getUserCollectionTrees(state)
  }),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    loadCollections: () => dispatch(loadCollections()),
    openAddCollectionModal: () => dispatch(openModal(CreateCollection))
  })
)(LibraryViewComponent);
