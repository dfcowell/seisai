import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { importFiles } from "Store/Import/ImportActions";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { MosaicWindow, MosaicBranch } from "react-mosaic-component";
import { AnyAction } from "redux";
import styled from "styled-components";

import { IImportFile } from "Store/Import/IImportFile";
import { getImportFiles } from "Store/Import/ImportReducer";

import { ImportThumbnail } from "./ImportThumbnail";
import { Basic } from "UI/Containers/Basic";

type ImportViewProps = {
  onDrop: (files: File[]) => void;
  files: IImportFile[];
  path: MosaicBranch[];
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ImportViewComponent: FC<ImportViewProps> = ({ onDrop, files, path }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop
  });

  return (
    <MosaicWindow path={path} title="Import">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <Basic>
          {files.length === 0 &&
            (isDragActive ? (
              <p>Drop photos here to import.</p>
            ) : (
              <p>
                Drag and drop photos here to import, or click to select files.
              </p>
            ))}
          {files.map(f => (
            <ImportThumbnail file={f} key={f.handle.name} />
          ))}
        </Basic>
      </Container>
    </MosaicWindow>
  );
};

export const ImportView = connect(
  (state: IAppState) => ({
    files: getImportFiles(state)
  }),
  (dispatch: ThunkDispatch<IAppState, null, AnyAction>) => ({
    onDrop: (files: File[]) => dispatch(importFiles(files))
  })
)(ImportViewComponent);
