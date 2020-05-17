import React, { FC } from 'react';
import { IPhoto } from 'Seisai/Store/Photos/IPhoto';
import { Thumbnail } from 'Seisai/UI/Photos/Thumbnail';
import { Basic } from 'Seisai/UI/Containers/Basic';
import { H3 } from 'Seisai/UI/Typography/H3';
import { P } from 'Seisai/UI/Typography/P';

type SinglePreviewProps = {
  photo: IPhoto;
};

export const SinglePreview: FC<SinglePreviewProps> = ({ photo }) => (
  <>
    <Basic>
      <Thumbnail src={`/photos/${photo.id}/image?size=800,600`} />
      <P>{photo.originalFilename}</P>
    </Basic>
  </>
);
