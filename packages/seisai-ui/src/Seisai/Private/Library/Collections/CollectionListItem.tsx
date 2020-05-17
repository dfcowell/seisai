import React, { FC, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { ICollectionTree } from 'Seisai/Store/Collections/ICollectionTree';

const CollectionListItemContainer = styled.div`
  margin-bottom: 0.6em;
`;

const CollectionListItemButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: block;
  padding: 0;
`;

type CollectionListItemProps = {
  collection: ICollectionTree;
  collapse: (event: SyntheticEvent<HTMLButtonElement>) => void;
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
};

export const CollectionListItem: FC<CollectionListItemProps> = ({
  collapse,
  collection: { id, name, children },
  onClick,
}) => (
  <CollectionListItemContainer key={id}>
    <CollectionListItemButton onClick={onClick} name={id.toString()}>
      {name}
    </CollectionListItemButton>
    {(children || []).map((child) => (
      <CollectionListItem
        collection={child}
        collapse={collapse}
        onClick={onClick}
      />
    ))}
  </CollectionListItemContainer>
);
