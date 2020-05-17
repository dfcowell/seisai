import { LibraryTileId } from './LibraryTileId';

import { CollectionsPanel } from './Collections/CollectionsPanel';
import { PhotoGrid } from './Photos/PhotoGrid';
import { PreviewPanel } from './Preview/PreviewPanel';
import { IMosaicTile } from 'Seisai/UI/IMosaicTile';
import { ImportView } from './Import/ImportView';

export const libraryTiles: {
  [key in LibraryTileId]: IMosaicTile;
} = {
  [LibraryTileId.Collections]: CollectionsPanel,
  [LibraryTileId.Import]: ImportView,
  [LibraryTileId.Library]: PhotoGrid,
  [LibraryTileId.Preview]: PreviewPanel,
};
