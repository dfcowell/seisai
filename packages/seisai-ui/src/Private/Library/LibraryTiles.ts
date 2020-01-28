import { LibraryTileId } from "./LibraryTileId";

import { CollectionsPanel } from "./Collections/CollectionsPanel";
import { PhotoGrid } from "./Photos/PhotoGrid";
import { PreviewPanel } from "./Preview/PreviewPanel";
import { IMosaicTile } from "UI/IMosaicTile";

export const libraryTiles: {
  [key in LibraryTileId]: IMosaicTile;
} = {
  [LibraryTileId.Collections]: CollectionsPanel,
  [LibraryTileId.Library]: PhotoGrid,
  [LibraryTileId.Preview]: PreviewPanel
};
