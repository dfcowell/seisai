import React, { FC, useState, useEffect } from "react";
import { IImportFile } from "Store/Import/IImportFile";
import styled from "styled-components";
import { P } from "UI/Typography/P";
import { EventContext } from "UI/Util/EventContext";
import { Truncate } from "UI/Util/Truncate";

const Container = styled.div`
  background: ${props => props.theme.colors.grey};
  border: 1px solid ${props => props.theme.colors.darkGrey};
  display: inline-block;
  overflow: truncate;
  padding: 1em;
  width: 20%;
`;

const ThumbnailContainer = styled.div`
  align-items: center;
  display: flex;
  height: 8em;
  justify-content: center;
  margin-bottom: 0.5em;
  width: 100%;
`;

const Thumbnail = styled.img<{ opacity?: number }>`
  max-height: 100%;
  max-width: 100%;
  opacity: ${props => props.opacity || 1};
`;

export const ImportThumbnail: FC<{ file: IImportFile }> = ({ file }) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!url) {
      setUrl(URL.createObjectURL(file.handle));
    }

    return () => URL.revokeObjectURL(url as string);
  }, [file.handle, url]);

  return (
    <EventContext Element={Container} handlers={["onClick"]}>
      <ThumbnailContainer>
        <Thumbnail src={url} />
      </ThumbnailContainer>
      <P align="center">
        <Truncate>{file.handle.name}</Truncate>
      </P>
    </EventContext>
  );
};
