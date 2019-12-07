import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { importFiles } from "Store/Import/ImportActions";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { AnyAction } from "redux";
import { IImportFile } from "Store/Import/IImportFile";
import { getImportFiles } from "Store/Import/ImportReducer";
import { ImportThumbnail } from "./ImportThumbnail";
import styled from "styled-components";

type ImportViewProps = {
  onDrop: (files: File[]) => void;
  files: IImportFile[];
};

const Container = styled.div`
  width: 100%;
`;

const ImportViewComponent: FC<ImportViewProps> = ({ onDrop, files }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop
  });
  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {files.length === 0 &&
        (isDragActive ? (
          <p>Drop photos here to import.</p>
        ) : (
          <p>Drag and drop photos here to import, or click to select files.</p>
        ))}
      {files.map(f => (
        <ImportThumbnail file={f} key={f.handle.name} />
      ))}
    </Container>
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
