import React, { FC } from "react";
import { useSelector } from "react-redux";

import { Backdrop } from "UI/Containers/Modal/Backdrop";
import { Container } from "UI/Containers/Modal/Container";
import { isModalOpen, getModalContent } from "Store/Modal/ModalReducer";

import { Mosaic } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { libraryTiles } from "./LibraryTiles";
import { LibraryTileId } from "./LibraryTileId";

export const LibraryView: FC = () => {
  const showModal = useSelector(isModalOpen);
  const ModalComponent = useSelector(getModalContent);

  return (
    <>
      <Mosaic<LibraryTileId>
        renderTile={(id, path) => {
          const Component = libraryTiles[id];

          return <Component path={path} />;
        }}
        initialValue={{
          direction: "row",
          first: {
            direction: "row",
            first: LibraryTileId.Collections,
            second: LibraryTileId.Library,
            splitPercentage: 20
          },
          second: LibraryTileId.Preview,
          splitPercentage: 80
        }}
      />
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
