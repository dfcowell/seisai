import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { ImportFileStatus } from "./ImportFileStatus";
import { getImportService } from "./ImportReducer";
import { ImportService } from "./ImportService";
import { IImportFile } from "./IImportFile";

export enum ImportActionType {
  EnqueueFiles = "seisai/import/ENQUEUE_FILES",
  StartImport = "seisai/import/START",
  UpdateUploadProgress = "seisai/import/UPDATE_UPLOAD_PROGRESS"
}

export const enqueueFiles = (files: IImportFile[]) => ({
  type: ImportActionType.EnqueueFiles,
  files
});

// TODO: There is a bug in this system where the import session
// is never closed. The import service should be destroyed after
// some kind of timeout, or the user taking some kind of action.
export const importFiles: ActionCreator<ThunkAction<
  void,
  IAppState,
  null,
  Action
>> = (files: File[]) => async (dispatch, getState) => {
  const importFiles = files.map(file => ({
    status: ImportFileStatus.Queued,
    progress: 0,
    handle: file
  }));

  dispatch(enqueueFiles(importFiles));

  let service = getImportService(getState());

  if (!service) {
    service = new ImportService();

    dispatch(startImport(service));
  }

  // TODO: Add logic for handling upload progress and
  // updating state when file has been successfully uploaded
  importFiles.forEach(file =>
    (service as ImportService).queueFileForImport(file)
  );
};

export const startImport = (service: ImportService) => ({
  type: ImportActionType.StartImport,
  service
});
