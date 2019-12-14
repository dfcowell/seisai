import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadPhotos } from 'Store/Photos/PhotoActions';
import { getPhotos, getPhotoCount } from 'Store/Photos/PhotoReducer';
import { Thumbnail } from 'UI/Photos/Thumbnail';
import { GridContainer } from 'UI/Photos/GridContainer';
import { GridItem } from 'UI/Photos/GridItem';
import { ThumbnailContainer } from 'UI/Photos/ThumbnailContainer';
import { Truncate } from 'UI/Util/Truncate';
import { DrawerContainer } from 'UI/Containers/Drawer/DrawerContainer';
import { DrawerHeader } from 'UI/Containers/Drawer/DrawerHeader';

export const PhotoGrid: FC = () => {
  const dispatch = useDispatch();
  const photos = useSelector(getPhotos);
  const count = useSelector(getPhotoCount);
  const [loadedPhotos, setLoadedPhotos] = useState(false);

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
              <Thumbnail src={`/photos/${photo.id}/image?size=300,200`} />
            </ThumbnailContainer>
            <strong><Truncate>{photo.originalFilename}</Truncate></strong>
          </GridItem>
        ))}
      </GridContainer>
    </DrawerContainer>
  );
}