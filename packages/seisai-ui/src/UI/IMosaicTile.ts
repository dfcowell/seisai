import { MosaicBranch } from "react-mosaic-component";
import { FC } from "react";

export type IMosaicTile = FC<{
  path: MosaicBranch[];
}>;
