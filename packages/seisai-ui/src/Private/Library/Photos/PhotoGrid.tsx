import React, {
  FC,
  useState,
  useEffect,
  MouseEventHandler,
  useCallback
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Hotkeys from "react-hot-keys";

import { loadPhotos, selectionUpdated } from "Store/Photos/PhotoActions";
import {
  getPhotos,
  getPhotoCount,
  getSelectedMap,
  getSelectedIds
} from "Store/Photos/PhotoReducer";
import { GridContainer } from "UI/Photos/GridContainer";
import { GridItem } from "UI/Photos/GridItem";
import { ThumbnailContainer } from "UI/Photos/ThumbnailContainer";
import { Truncate } from "UI/Util/Truncate";
import { DrawerContainer } from "UI/Containers/Drawer/DrawerContainer";
import { DrawerHeader } from "UI/Containers/Drawer/DrawerHeader";
import { SelectableThumbnail } from "UI/Photos/SelectableThumbnail";
import { createSelectionHandler } from "UI/Util/Selection";

type PhotoGridProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PhotoGrid: FC<PhotoGridProps> = () => {
  const dispatch = useDispatch();
  const photos = useSelector(getPhotos);
  const count = useSelector(getPhotoCount);
  const [loadedPhotos, setLoadedPhotos] = useState(false);
  const selectedPhotoMap = useSelector(getSelectedMap);
  const selectedPhotoIds = useSelector(getSelectedIds);
  const deselect = useCallback(() => dispatch(selectionUpdated([])), [
    dispatch
  ]);

  const handleSelection: MouseEventHandler<HTMLImageElement> = useCallback(
    createSelectionHandler(
      photos,
      selectedPhotoIds,
      selectedPhotoMap,
      ids => dispatch(selectionUpdated(ids)),
      id => parseInt(id, 10)
    ),
    [dispatch, selectedPhotoIds, selectedPhotoMap, photos]
  );

  useEffect(() => {
    if (!loadedPhotos) {
      setLoadedPhotos(true);
      dispatch(loadPhotos());
    }
  }, [loadedPhotos, dispatch]);

  return (
    <DrawerContainer>
      <DrawerHeader>Library ({count} items)</DrawerHeader>
      <GridContainer>
        {photos.map(photo => (
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
      <Hotkeys keyName="esc" onKeyUp={deselect} />
    </DrawerContainer>
  );
};
