import { ImportFileStatus } from "./ImportFileStatus";

export interface IImportFile {
  progress?: number;
  status: ImportFileStatus;
  handle: File;
}