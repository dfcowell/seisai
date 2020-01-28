import React, { FC } from "react";
import { IPhoto } from "Store/Photos/IPhoto";
import { Thumbnail } from "UI/Photos/Thumbnail";
import { P } from "UI/Typography/P";

type MultiPreviewProps = {
  photos: IPhoto[];
};

export const MultiPreview: FC<MultiPreviewProps> = ({ photos }) => (
  <>
    {photos.map(photo => (
      <div>
        <Thumbnail src={`/photos/${photo.id}/image?size=64,64&crop=T`} />
        <P>{photo.originalFilename}</P>
      </div>
    ))}
  </>
);
