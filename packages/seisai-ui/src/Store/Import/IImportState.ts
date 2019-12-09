import { IImportFile } from "./IImportFile";
import { ImportService } from "./ImportService";

export interface IImportState {
  service?: ImportService;
  files: IImportFile[];
}
