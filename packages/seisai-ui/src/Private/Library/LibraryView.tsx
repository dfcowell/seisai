import React, { FC, ComponentType } from "react";
import { connect } from "react-redux";

import { Backdrop } from "UI/Containers/Modal/Backdrop";
import { Container } from "UI/Containers/Modal/Container";
import { IAppState } from "Store/IAppState";
import { isModalOpen, getModalContent } from "Store/Modal/ModalReducer";

import { CollectionsPanel } from "./Collections/CollectionsPanel";

type LibraryViewProps = {
  ModalComponent?: ComponentType;
  showModal: boolean;
};

const LibraryViewComponent: FC<LibraryViewProps> = ({
  ModalComponent,
  showModal
}) => {
  return (
    <>
      <CollectionsPanel />
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
  })
)(LibraryViewComponent);
