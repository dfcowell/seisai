import React, {
  FC,
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hotkeys from 'react-hot-keys';

import { selectionUpdated } from 'Seisai/Store/Photos/PhotoActions';
import {
  getSelectedMap,
  getSelectedIds,
} from 'Seisai/Store/Photos/PhotoReducer';
import { GridContainer } from 'Seisai/UI/Photos/GridContainer';
import { GridItem } from 'Seisai/UI/Photos/GridItem';
import { ThumbnailContainer } from 'Seisai/UI/Photos/ThumbnailContainer';
import { Truncate } from 'Seisai/UI/Util/Truncate';
import { SelectableThumbnail } from 'Seisai/UI/Photos/SelectableThumbnail';
import { createSelectionHandler } from 'Seisai/UI/Util/Selection';
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component';
import { LibraryTileId } from '../LibraryTileId';
import {
  getSelectedCollection,
  getLibraryPhotos,
} from 'Seisai/Store/Library/LibraryReducer';
import { ICollection } from 'Seisai/Store/Collections/ICollection';
import { initLibrary } from 'Seisai/Store/Library/LibraryActions';
import { CollectionHeader } from './CollectionHeader';

type PhotoGridProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  path: MosaicBranch[];
};

const getTitle = (collection: ICollection | null) => {
  const base = 'Library';
  if (!collection) {
    return base;
  }

  return `${base} > ${collection.name}`;
};

export const PhotoGrid: FC<PhotoGridProps> = ({ path }) => {
  const [initialized, doneInitialize] = useState(false);
  const dispatch = useDispatch();
  const photos = useSelector(getLibraryPhotos);
  const collection = useSelector(getSelectedCollection);
  const selectedPhotoMap = useSelector(getSelectedMap);
  const selectedPhotoIds = useSelector(getSelectedIds);
  const deselectAll = useCallback(() => dispatch(selectionUpdated([])), [
    dispatch,
  ]);

  const handleSelection: MouseEventHandler<HTMLImageElement> = useCallback(
    createSelectionHandler(
      photos,
      selectedPhotoIds,
      selectedPhotoMap,
      (ids) => dispatch(selectionUpdated(ids)),
      (id) => parseInt(id, 10),
    ),
    [dispatch, selectedPhotoIds, selectedPhotoMap, photos],
  );

  useEffect(() => {
    if (!initialized) {
      doneInitialize(true);
      dispatch(initLibrary());
    }
  }, [doneInitialize, dispatch]);

  return (
    <MosaicWindow<LibraryTileId> path={path} title={getTitle(collection)}>
      {collection && <CollectionHeader collection={collection} />}
      <GridContainer>
        {photos.map((photo) => (
          <GridItem width="16em" key={photo.id}>
            <ThumbnailContainer>
              <SelectableThumbnail
                id={photo.id.toString()}
                onClick={handleSelection}
                src={`/photos/${photo.id}/image?size=300,200`}
                selected={selectedPhotoMap[photo.id]}
              />
            </ThumbnailContainer>
            <strong>
              <Truncate>{photo.originalFilename}</Truncate>
            </strong>
          </GridItem>
        ))}
      </GridContainer>
      <Hotkeys keyName="esc" onKeyUp={deselectAll} />
    </MosaicWindow>
  );
};
