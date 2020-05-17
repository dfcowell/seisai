import React, { SFC } from 'react';

import styled from 'styled-components';
import { ICollection } from 'Seisai/Store/Collections/ICollection';
import { P } from 'Seisai/UI/Typography/P';

const CollectionHeaderContainer = styled.div`
  box-shadow: 0 1px 1px rgba(16, 22, 26, 0.15);
  padding: 15px;
`;

export const DefaultCollectionHeader: SFC<{ collection: ICollection }> = ({
  collection,
}) => (
  <CollectionHeaderContainer>
    <P>{collection.description}</P>
  </CollectionHeaderContainer>
);
