import React, {
  FC,
  useState,
  useEffect,
  MouseEventHandler,
  useCallback
} from "react";
import { useDispatch, useSelector } from "react-redux";

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

type PhotoGridProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const findLastIndex = <T extends {}>(
  arr: Array<T>,
  predicate: (value: T, index: number) => boolean
) => {
  if (arr.length === 0) {
    return -1;
  }

  let index = arr.length - 1;

  do {
    if (predicate(arr[index], index)) {
      return index;
    }
  } while ((index -= 1) > 0);

  return -1;
};

export const PhotoGrid: FC<PhotoGridProps> = props => {
  const dispatch = useDispatch();
  const photos = useSelector(getPhotos);
  const count = useSelector(getPhotoCount);
  const [loadedPhotos, setLoadedPhotos] = useState(false);
  const selectedPhotoMap = useSelector(getSelectedMap);
  const selectedPhotoIds = useSelector(getSelectedIds);

  const handleSelection: MouseEventHandler<HTMLImageElement> = useCallback(
    event => {
      const photoId = parseInt(event.currentTarget.id, 10);

      if (event.ctrlKey && selectedPhotoMap[photoId]) {
        return dispatch(
          selectionUpdated(selectedPhotoIds.filter(id => id !== photoId))
        );
      }

      if (event.ctrlKey) {
        return dispatch(selectionUpdated([...selectedPhotoIds, photoId]));
      }

      if (event.shiftKey) {
        const clickedIndex = photos.findIndex(photo => photo.id === photoId);

        const firstSelectedIndex = photos.findIndex(
          photo => selectedPhotoMap[photo.id]
        );
        const lastSelectedIndex = findLastIndex(
          photos,
          photo => selectedPhotoMap[photo.id]
        );

        if (
          clickedIndex < firstSelectedIndex ||
          clickedIndex > lastSelectedIndex
        ) {
          // grow selection
          const selection = photos
            .slice(
              Math.min(clickedIndex, firstSelectedIndex),
              Math.max(clickedIndex, lastSelectedIndex) + 1
            )
            .map(photo => photo.id);

          return dispatch(selectionUpdated(selection));
        } else {
          let deltaStart = clickedIndex - firstSelectedIndex;
          let deltaEnd = lastSelectedIndex - clickedIndex;

          if (deltaStart < deltaEnd) {
            const selection = photos
              .slice(clickedIndex, lastSelectedIndex + 1)
              .map(photo => photo.id);
            return dispatch(selectionUpdated(selection));
          } else {
            const selection = photos
              .slice(firstSelectedIndex, clickedIndex + 1)
              .map(photo => photo.id);
            return dispatch(selectionUpdated(selection));
          }
        }
      }

      dispatch(selectionUpdated([photoId]));
    },
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
          <GridItem width={20} key={photo.id}>
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
    </DrawerContainer>
  );
};
