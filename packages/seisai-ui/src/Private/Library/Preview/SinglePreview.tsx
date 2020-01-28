import React, { FC } from "react";
import { IPhoto } from "Store/Photos/IPhoto";
import { Thumbnail } from "UI/Photos/Thumbnail";
import { Basic } from "UI/Containers/Basic";
import { H3 } from "UI/Typography/H3";
import { P } from "UI/Typography/P";

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
