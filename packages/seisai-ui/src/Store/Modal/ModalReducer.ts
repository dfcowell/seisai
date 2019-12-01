import { ComponentType } from "react";
import { Action } from "redux";

import { IModalState } from "./IModalState";
import { ModalAction } from "./ModalActions";
import { IAppState } from "Store/IAppState";

const defaultState: IModalState = {
  open: false
};

type ModalActions = Action<ModalAction> & { Content?: ComponentType };

export const modalReducer = (state = defaultState, action: ModalActions) => {
  switch (action.type) {
    case ModalAction.Open:
      return {
        open: true,
        Content: action.Content
      };

    case ModalAction.Close:
      return {
        open: false
      };

    default:
      return state;
  }
};

export const isModalOpen = (state: IAppState) => state.modal.open;
export const getModalContent = (state: IAppState) => state.modal.Content;
