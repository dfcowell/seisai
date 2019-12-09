import { IImportState } from "./IImportState";
import { ImportActionType } from "./ImportActions";
import { Action } from "redux";
import { IImportFile } from "./IImportFile";
import { IAppState } from "Store/IAppState";

const defaultState: IImportState = {
  files: []
};

type ImportActions = Action<ImportActionType> & { files?: IImportFile[] };

export const importReducer = (state = defaultState, action: ImportActions) => {
  switch (action.type) {
    case ImportActionType.EnqueueFiles:
      return {
        ...state,
        files: [...state.files, ...(action.files as IImportFile[])]
      };

    default:
      return state;
  }
};

export const getImportService = (state: IAppState) => state.import.service;

export const getImportFiles = (state: IAppState) => state.import.files;
