import React, { FC } from "react";
import { useSelector } from "react-redux";

import { Backdrop } from "UI/Containers/Modal/Backdrop";
import { Container } from "UI/Containers/Modal/Container";
import { isModalOpen, getModalContent } from "Store/Modal/ModalReducer";

import { CollectionsPanel } from "./Collections/CollectionsPanel";
import { PhotoGrid } from "./Photos/PhotoGrid";

export const LibraryView: FC = () => {
  const showModal = useSelector(isModalOpen);
  const ModalComponent = useSelector(getModalContent);

  return (
    <>
      <CollectionsPanel />
      <PhotoGrid />
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
