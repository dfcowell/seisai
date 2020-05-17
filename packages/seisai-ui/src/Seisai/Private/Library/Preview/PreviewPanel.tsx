import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { getSelectedPhotos } from 'Seisai/Store/Photos/PhotoReducer';
import { SinglePreview } from './SinglePreview';
import { MultiPreview } from './MultiPreview';
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component';
import { LibraryTileId } from '../LibraryTileId';
import { IPhoto } from 'Seisai/Store/Photos/IPhoto';

type PreviewPanelProps = {
  path: MosaicBranch[];
};

const renderBody = (selectedPhotos: IPhoto[]) => {
  switch (selectedPhotos.length) {
    case 0:
      return <p>No active selection</p>;
    case 1:
      return <SinglePreview photo={selectedPhotos[0]} />;
    default:
      return <MultiPreview photos={selectedPhotos} />;
  }
};

export const PreviewPanel: FC<PreviewPanelProps> = ({ path }) => {
  const selectedPhotos = useSelector(getSelectedPhotos);

  return (
    <MosaicWindow<LibraryTileId> path={path} title="Preview">
      {renderBody(selectedPhotos)}
    </MosaicWindow>
  );
};
