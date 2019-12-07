import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { ImportFileStatus } from "./ImportFileStatus";

export enum ImportActionType {
  EnqueueFiles = 'seisai/import/ENQUEUE_FILES',
  UpdateUploadProgress = 'seisai/import/UPDATE_UPLOAD_PROGRESS'
}

export const enqueueFiles = (files: File[]) => ({
  type: ImportActionType.EnqueueFiles,
  files: files.map(file => ({
    status: ImportFileStatus.Queued,
    progress: 0,
    handle: file
  }))
});

export const importFiles: ActionCreator<ThunkAction<
  void,
  IAppState,
  null,
  Action
>> = (files: File[]) => async (dispatch) => {
  dispatch(enqueueFiles(files));
  // TODO: Add logic for kicking off the import worker if there's no running import
}