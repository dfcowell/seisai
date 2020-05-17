import React, { FC, useState, useEffect } from 'react';
import { IImportFile } from 'Seisai/Store/Import/IImportFile';
import styled from 'styled-components';
import { P } from 'Seisai/UI/Typography/P';
import { EventContext } from 'Seisai/UI/Util/EventContext';

const Container = styled.div`
  overflow: truncate;
`;

const Thumbnail = styled.div<{ opacity?: number; src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  display: inline-block;
  margin-right: 0.5em;
  height: 2.5em;
  width: 2.5em;
  opacity: ${(props) => props.opacity || 1};
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
    <EventContext Element={Container} handlers={['onClick']}>
      <P>
        <Thumbnail src={url as string} />
        {file.handle.name}
      </P>
    </EventContext>
  );
};
