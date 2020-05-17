import React, { SFC } from 'react';

import { DefaultCollectionHeader } from './DefaultCollectionHeader';
import { ICollection } from 'Seisai/Store/Collections/ICollection';

const headerComponents = {
  date: DefaultCollectionHeader,
  import: DefaultCollectionHeader,
  system: DefaultCollectionHeader,
  user: DefaultCollectionHeader,
};

export type CollectionHeaderComponent = SFC<{ collection: ICollection }>;

export const CollectionHeader: CollectionHeaderComponent = (props) => {
  const HeaderComponent = headerComponents[props.collection.type];

  return <HeaderComponent {...props} />;
};
