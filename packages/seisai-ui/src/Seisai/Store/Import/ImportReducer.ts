import { IImportState } from './IImportState';
import { ImportActionType } from './ImportActions';
import { Action } from 'redux';
import { IImportFile } from './IImportFile';
import { IAppState } from 'Seisai/Store/IAppState';
import { ImportService } from './ImportService';

const defaultState: IImportState = {
  files: [],
};

type ImportActions = Action<ImportActionType> & {
  files?: IImportFile[];
  service?: ImportService;
};

export const importReducer = (state = defaultState, action: ImportActions) => {
  switch (action.type) {
    case ImportActionType.EnqueueFiles:
      return {
        ...state,
        files: [...state.files, ...(action.files as IImportFile[])],
      };

    case ImportActionType.StartImport:
      return {
        ...state,
        service: action.service as ImportService,
      };

    default:
      return state;
  }
};

export const getImportService = (state: IAppState) => state.import.service;

export const getImportFiles = (state: IAppState) => state.import.files;
